import { User } from '../entity/User';
import { getConnection } from 'typeorm';
import { UserQueryRepository } from '../repository/UserQueryRepository';
import { isNotFoundUser, NotFoundUser } from '../entity/NotFoundUser';
import { UserCommandRepository } from '../repository/UserCommandRepository';
import UserNotFoundError from '../error/UserNotFoundError';
import { KakaoRawInfo, UpdatedAccessTokenDTO, UserFavoriteNewsReturnDTO, UserInfo } from '../types';
import axios from 'axios';
import {
  ACCESS_TOKEN_INFO,
  CONTENT_TYPE, DEFAULT_ACCESS_TOKEN_EXPIRATION_SECONDS,
  DEFAULT_REFRESH_TOKEN_EXPIRATION_SECONDS,
  OAUTH_TOKEN,
  REQUEST_RAW_LINK,
  USER_LOGOUT_LINK,
} from '../shared/AuthLink';
import AccessTokenExpiredError from '../error/AccessTokenExpiredError';
import { promisify } from 'util';
import { Logger } from 'tslog';
import AlreadyLoggedOutError from '../error/AlreadyLoggedOutError';
import AlreadySignedUpError from '../error/AlreadySignedUpError';
import NewsService from './NewsService';

const redisClient = require('../util/redis');

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

export const findUserByKakaoId = async (kakaoId: string): Promise<User> => {
  const userQueryRepository = await getConnectionToUserQueryRepository();
  try {
    return await userQueryRepository.findByKakaoId(kakaoId);
  } catch (error) {
    return new NotFoundUser();
  }
};

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
  log.debug(' before expiry seconds validation ', accessToken);
  const expire_in: number = await checkAccessTokenExpirySeconds(accessToken);
  return expire_in < 0;
};

const checkAccessTokenExpirySeconds = async (accessToken: string): Promise<number> => {
  log.info(' >>>>>>>> accessToken ', accessToken);
  try {
    const { data: expireInfo } = await axios.get(ACCESS_TOKEN_INFO, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': CONTENT_TYPE,
      },
    });
    return expireInfo.expires_in;
  } catch (err) {
    throw new AccessTokenExpiredError();
  }
};

export const updateAccessTokenByRefreshToken = async (
  userId: string,
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
  userId: string,
  updatedAccessTokenDTO: UpdatedAccessTokenDTO,
): Promise<void> => {
  await saveTokensAtRedisMappedByUserId(
    userId,
    updatedAccessTokenDTO.access_token,
    updatedAccessTokenDTO.refresh_token,
  );
};

export const getKakaoRawInfo = async (_accessToken: string): Promise<KakaoRawInfo> => {
  const accessToken = await doesAccessTokenExpire(_accessToken);
  if (accessToken) {
    throw new AccessTokenExpiredError();
  }
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

export const loginUserWithKakao = async (accessToken: string): Promise<UserInfo> => {
  if (await doesAccessTokenExpire(accessToken)) {
    throw new AccessTokenExpiredError();
  }
  const kakaoRawInfo = await getKakaoRawInfo(accessToken);
  const user = await findUserByKakaoId(kakaoRawInfo.kakaoId);
  log.debug(' findUserByKakaoId USER >>>> ', user);
  log.debug(' isNotFoundUser ', isNotFoundUser(user));
  if (isNotFoundUser(user)) {
    log.warn('NOT FOUND USER ', user);
    throw new UserNotFoundError();
  }
  return new UserInfo(user);
};

const verifyUserAlreadyExistsByKakaoId = async (userId: string): Promise<void> => {
  if (!isNotFoundUser(await findUserByKakaoId(userId))) {
    throw new AlreadySignedUpError();
  }
};

// TODO: return user entity with wrapping object DTO
export const signUpUserWithKakao = async (accessToken: string, userId: string): Promise<User> => {
  if (await doesAccessTokenExpire(accessToken)) {
    throw new AccessTokenExpiredError();
  }

  await verifyUserAlreadyExistsByKakaoId(userId);
  const kakaoRawInfo = await getKakaoRawInfo(accessToken);
  const newUser = User.fromKakaoRawInfo(kakaoRawInfo);
  const userCommandRepository = await getConnectionToUserCommandRepository();

  return await userCommandRepository.registerOrSaveUser(newUser);
};

// TODO: refactor by splitting to AuthService from UserService
export const doesAccessTokenExists = async (accessToken: string): Promise<boolean> => {
  log.debug(' before expiry seconds validation ', accessToken);
  const expire_in: number = await checkAccessTokenExpirySeconds(accessToken);
  return expire_in < 0;
};

export const logOutUserWithKakao = async (_accessToken): Promise<string> => {
  if (await doesAccessTokenExists(_accessToken)) {
    throw new AlreadyLoggedOutError();
  }
  const { data: id } = await axios
    .get(USER_LOGOUT_LINK, {
      headers: {
        Authorization: 'Bearer ' + _accessToken,
        'Content-Type': CONTENT_TYPE,
      },
    })
    .then((res) => {
      return res;
    });
  return id;
};

const saveTokensAtRedisMappedByUserId = async (
  userId: string,
  accessToken: string,
  refreshToken: string,
): Promise<void> => {
  // TODO: to be refactored; is it possible to expire each value in Redis?
  const ACCESS_TOKEN = 'AT ';
  const REFRESH_TOKEN = 'RT ';
  promisify(redisClient.get).bind(redisClient);
  await redisClient.setex(ACCESS_TOKEN + userId, DEFAULT_ACCESS_TOKEN_EXPIRATION_SECONDS, accessToken);
  await redisClient.setex(REFRESH_TOKEN + userId, DEFAULT_REFRESH_TOKEN_EXPIRATION_SECONDS, refreshToken);
  return;
};

export const getAllFavoriteNewsList = async (
  kakaoId: string,
): Promise<UserFavoriteNewsReturnDTO> => {
  const userQueryRepository = await getConnectionToUserQueryRepository();
  const toBeUpdatedUser = await userQueryRepository.findByKakaoIdActiveRecordManner(kakaoId);
  const favoriteNews = await toBeUpdatedUser.getFavoriteNews();

  return {
    kakaoId: kakaoId,
    favoriteNews: favoriteNews,
  };
};

export const updateExistingUser = async (user: User): Promise<UserInfo> => {
  const userQueryRepository = await getConnectionToUserQueryRepository();
  const userCommandRepository = await getConnectionToUserCommandRepository();

  try {
    await userQueryRepository.findByKakaoId(user.kakaoId);
  } catch {
    throw new UserNotFoundError();
  }

  const returnUser = await userCommandRepository.registerOrSaveUser(user);
  const returnUserFavoriteNews = await returnUser.favoriteNews;
  const returnUserInfo = new UserInfo(returnUser);
  returnUserInfo.addFavoriteNewsAfterPromiseResolved(returnUserFavoriteNews);

  return returnUserInfo;
};

export const addNewFavoriteNews = async (kakaoId: string, newsId: string): Promise<UserInfo> => {
  const userQueryRepository = await getConnectionToUserQueryRepository();
  const pendingFavoriteNews = await NewsService.searchByNewsId(newsId);
  const toBeUpdatedUser2 = await userQueryRepository.findByKakaoIdActiveRecordManner(kakaoId);

  await toBeUpdatedUser2.addFavoriteNews(pendingFavoriteNews);
  return await updateExistingUser(toBeUpdatedUser2);
};

export const removeFavoriteNews = async (kakaoId: string, newsId: string): Promise<UserInfo> => {
  const userQueryRepository = await getConnectionToUserQueryRepository();
  const toBeforeUpdatedUser = await userQueryRepository.findByKakaoIdActiveRecordManner(kakaoId);
  const pendingRemovedNews = await NewsService.searchByNewsId(newsId);

  const toAfterUpdatedUser = await toBeforeUpdatedUser.removeFavoriteNews(pendingRemovedNews);
  return await updateExistingUser(toAfterUpdatedUser);
};

export default {
  loginUserWithKakao,
  signUpUserWithKakao,
  logOutUserWithKakao,
  findUserByEmail,
  getKakaoRawInfo,
  doesAccessTokenExpire,
  checkAccessTokenExpirySeconds,
  saveRefreshTokenAtRedisMappedByUserId: saveTokensAtRedisMappedByUserId,
  updateAccessTokenByRefreshToken,
  getAllFavoriteNewsList,
  addNewFavoriteNews,
  removeFavoriteNews,
};
