import { User } from '../entity/User';
import { getConnection } from 'typeorm';
import { UserQueryRepository } from '../repository/UserQueryRepository';
import { isNotFoundUser, NotFoundUser } from '../entity/NotFoundUser';
import { UserCommandRepository } from '../repository/UserCommandRepository';
import UserNotFoundError from '../error/UserNotFoundError';
import { KakaoRawInfo, UpdatedAccessTokenDTO } from '../types';
import axios from 'axios';
import {
  ACCESS_TOKEN_INFO,
  CONTENT_TYPE,
  DEFAULT_EXPIRATION_SECONDS,
  OAUTH_TOKEN,
  REQUEST_RAW_LINK,
} from '../shared/AuthLink';
import AccessTokenExpiredError from '../error/AccessTokenExpiredError';
import { promisify } from 'util';
const redisClient = require('../util/redis');
import { Logger } from 'tslog';

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

// TODO: DI to be implemented
const getConnectionToUserQueryRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(UserQueryRepository);
};

const getConnectionToUserCommandRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(UserCommandRepository);
};

// TODO: implement Null Object Pattern
export const findUserByEmail = async (email: string): Promise<User> => {
  const userRepository = await getConnectionToUserQueryRepository();
  try {
    const foundUser = await userRepository.findByEmail(email);
    log.debug(' >>>>>>>> foundUser ', foundUser);
    return foundUser;
  } catch (error) {
    return new NotFoundUser();
  }
};

// TODO: refactor by splitting to AuthService from UserService
export const doesAccessTokenExpire = async (accessToken: string): Promise<boolean> => {
  const expire_in = await checkAccessTokenExpirySeconds(accessToken);
  return expire_in < 0;
};

const checkAccessTokenExpirySeconds = async (accessToken: string) => {
  log.info(' >>>>>>>> accessToken ', accessToken);
  const { data: expireInfo } = await axios
    .get(ACCESS_TOKEN_INFO, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': CONTENT_TYPE,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      log.error(err.status);
      return err;
    });

  return expireInfo.expires_in;
};

export const updateAccessTokenByRefreshToken = async (
  userId: number,
  refreshToken: string,
): Promise<object> => {
  const payload = new URLSearchParams();
  payload.append('grant_type', 'refresh_token');
  payload.append('refresh_token', refreshToken);
  payload.append('client_id', process.env.KAKAO_CLIENT_ID);

  log.debug('payload >>>> ', payload);
  log.debug('userId >>>>', userId);

  const config = {
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
  };

  const {
    data: { access_token, expires_in, refresh_token, refresh_token_expires_in },
  } = await axios.post(OAUTH_TOKEN, payload, config).then((res) => {
    return res;
  });

  const updatedAccessTokenDTO = new UpdatedAccessTokenDTO(
    access_token,
    expires_in,
    refresh_token,
    refresh_token_expires_in,
  );

  log.info(refresh_token, refresh_token_expires_in);
  if (updatedAccessTokenDTO.doesRetrievedRefreshTokenExist()) {
    await updateRefreshTokenAtRedisWithUserId(userId, updatedAccessTokenDTO);
  }

  return {
    access_token,
    expires_in,
  };
};

const updateRefreshTokenAtRedisWithUserId = async (
  userId: number,
  updatedAccessTokenDTO: UpdatedAccessTokenDTO,
): Promise<void> => {
  // const kakaoRawInfo = await getKakaoRawInfo(updatedAccessTokenDTO.access_token);
  // const userId = kakaoRawInfo.id;
  await saveRefreshTokenAtRedisMappedByUserId(userId, updatedAccessTokenDTO.refresh_token);
};

export const getKakaoRawInfo = async (_accessToken: string): Promise<KakaoRawInfo> => {
  log.info(' >>>>> ____accessToken ', _accessToken);
  const accessToken = await doesAccessTokenExpire(_accessToken);
  log.info('accessToken >>>> ', accessToken);
  const { data: userInfo } = await axios
    .get(REQUEST_RAW_LINK, {
      headers: {
        Authorization: 'Bearer ' + _accessToken,
        'Content-Type': CONTENT_TYPE,
      },
    })
    .then((res) => {
      return res;
    });

  const kakaoRawInfo = KakaoRawInfo.toKakaoRawInfo(userInfo);
  log.debug(kakaoRawInfo);
  return kakaoRawInfo;
};

export const loginUserWithKakao = async (
  accessToken: string,
  refreshToken: string,
): Promise<User> => {
  if (await doesAccessTokenExpire(accessToken)) {
    throw new AccessTokenExpiredError();
  }
  const kakaoRawInfo = await getKakaoRawInfo(accessToken);
  // TODO: 카카오에서 넘겨주는 user_id로 중복성 체크
  const user = await findUserByEmail(kakaoRawInfo.email);
  log.debug(" findUserByEmail USER >>>> ", user);
  if (isNotFoundUser(user)) {
    log.warn('NOT FOUND USER ', user);
    throw new UserNotFoundError();
  }
  await saveRefreshTokenAtRedisMappedByUserId(user.id, refreshToken);
  return user;
};

export const signUpUserWithKakao = async (accessToken) => {
  if (await doesAccessTokenExpire(accessToken)) {
    throw new AccessTokenExpiredError();
  }
  const kakaoRawInfo = await getKakaoRawInfo(accessToken);
  const newUser = User.fromKakaoRawInfo(kakaoRawInfo);
  const userCommandRepository = await getConnectionToUserCommandRepository();
  return await userCommandRepository.registerNewUser(newUser);
};

const saveRefreshTokenAtRedisMappedByUserId = async (
  userId: number,
  refreshToken: string,
): Promise<void> => {
  promisify(redisClient.get).bind(redisClient);
  await redisClient.setex(userId, DEFAULT_EXPIRATION_SECONDS, refreshToken);
  return;
};

export default {
  loginUserWithKakao,
  signUpUserWithKakao,
  findUserByEmail,
  getKakaoRawInfo,
  doesAccessTokenExpire,
  checkAccessTokenExpirySeconds,
  updateAccessTokenByRefreshToken,
};
