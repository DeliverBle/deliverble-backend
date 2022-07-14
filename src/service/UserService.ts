import { User } from '../entity/User';
import { getConnection } from 'typeorm';
import { UserQueryRepository } from '../repository/UserQueryRepository';
import { isFoundUser, NotFoundUser } from '../entity/NotFoundUser';
import { UserCommandRepository } from '../repository/UserCommandRepository';
import UserNotFoundError from '../error/UserNotFoundError';
import { KakaoRawInfo } from '../types';
import axios from 'axios';
import { ACCESS_TOKEN_INFO, CONTENT_TYPE, OAUTH_TOKEN, REQUEST_RAW_LINK } from '../shared/AuthLink';
import AccessTokenExpiredError from '../error/AccessTokenExpiredError';
import { promisify } from 'util';
const redisClient = require('../util/redis');
import { Logger } from "tslog";

const log: Logger = new Logger({ name: "딜리버블 백엔드 짱짱" });

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
    return await userRepository.findOneOrFail({ email });
  } catch (error) {
    return new NotFoundUser();
  }
};

// TODO: refactor by splitting to AuthService from UserService
export const doesAccessTokenExpire = async (
  accessToken: string,
  refreshToken: string,
): Promise<boolean> => {
  log.info("refreshToken >>>> ", refreshToken);
  const { data: expireInfo } = await axios
    .get(ACCESS_TOKEN_INFO, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': CONTENT_TYPE,
      },
    })
    .then((res) => {
      return res;
    });

  return expireInfo.expires_in < 0;
};

export const updateAccessTokenByRefreshToken = async (refreshToken: string): Promise<string> => {
  const payload = new URLSearchParams();
  payload.append('grant_type', 'refresh_token');
  payload.append('refresh_token', refreshToken);
  payload.append('client_id', process.env.KAKAO_CLIENT_ID);

  const config = {
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
  };

  const { data: updatedAccessToken } = await axios
    .post(OAUTH_TOKEN, payload, config)
    .then((res) => {
      return res;
    });

  return updatedAccessToken;
};

export const getKakaoRawInfo = async (
  _accessToken: string,
  _refreshToken: string,
): Promise<KakaoRawInfo> => {
  const accessToken = await doesAccessTokenExpire(_accessToken, _refreshToken);
  log.info("accessToken >>>> ", accessToken);
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

  return KakaoRawInfo.toKakaoRawInfo(userInfo);
};

export const loginUserWithKakao = async (
  accessToken: string,
  refreshToken: string,
): Promise<User> => {
  if (await doesAccessTokenExpire(accessToken, refreshToken)) {
    throw new AccessTokenExpiredError();
  }
  const kakaoRawInfo = await getKakaoRawInfo(accessToken, refreshToken);
  const user = await findUserByEmail(kakaoRawInfo.email);
  if (!isFoundUser(user)) {
    await saveRefreshTokenAtRedisMappedByUserId(user.id, refreshToken);
    throw new UserNotFoundError();
  }
  await saveRefreshTokenAtRedisMappedByUserId(user.id, refreshToken);
  return user;
};

const saveRefreshTokenAtRedisMappedByUserId = async (
  userId: number,
  refreshToken: string,
): Promise<void> => {
  promisify(redisClient.get).bind(redisClient);
  await redisClient.set(userId, refreshToken);
  return;
};

export default {
  loginUserWithKakao,
  findUserByEmail,
  doesAccessTokenExpire,
  updateAccessTokenByRefreshToken,
};
