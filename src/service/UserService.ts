import { User } from '../entity/User';
import { getConnection } from 'typeorm';
import { UserQueryRepository } from '../repository/UserQueryRepository';
import { isNotFoundUser, NotFoundUser } from '../entity/NotFoundUser';
import { UserCommandRepository } from '../repository/UserCommandRepository';
import UserNotFoundError from '../error/UserNotFoundError';
import {
  KakaoRawInfo,
  NewsReturnDTO,
  NewsReturnDTOCollection,
  UpdatedAccessTokenDTO,
  UserFavoriteNewsReturnDTO,
  UserInfo,
} from '../types';
import axios from 'axios';
import {
  ACCESS_TOKEN_INFO,
  ACCESS_TOKEN_PREFIX,
  CONTENT_TYPE,
  DEFAULT_ACCESS_TOKEN_EXPIRATION_SECONDS,
  DEFAULT_REFRESH_TOKEN_EXPIRATION_SECONDS,
  OAUTH_TOKEN,
  REFRESH_TOKEN_PREFIX,
  REQUEST_RAW_LINK,
  USER_LOGOUT_LINK,
} from '../shared/AuthLink';
import AccessTokenExpiredError from '../error/AccessTokenExpiredError';
import { promisify } from 'util';
import { Logger } from 'tslog';
import AlreadyLoggedOutError from '../error/AlreadyLoggedOutError';
import AlreadySignedUpError from '../error/AlreadySignedUpError';
import NewsService from './NewsService';
import ResourceNotFoundError from '../error/ResourceNotFoundError';
import CustomError from '../error/CustomError';

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
export const doesAccessTokenExpire = async (
  accessToken: string,
  userId: string,
): Promise<boolean> => {
  log.debug(' before expiry seconds validation ', accessToken);
  const expire_in: number = await checkAccessTokenExpirySecondsToKakaoServer(accessToken);
  return expire_in < 0;
};

export const checkAccessTokenExpiryTTLToRedisServer = async (
  accessToken: string,
  userId: string,
): Promise<number> => {
  // TODO: validate this logic in controller or additional DTO type class
  log.debug(' HELLO ');
  if (!accessToken || !userId) {
    log.debug(accessToken, userId);
    throw new ResourceNotFoundError();
  }
  const KEY = ACCESS_TOKEN_PREFIX + userId;
  log.debug('KEY ', KEY);
  const getAsync = promisify(redisClient.get).bind(redisClient);
  const ACCESS_TOKEN_KEY_ON_REDIS = await getAsync(KEY);
  if (ACCESS_TOKEN_KEY_ON_REDIS !== accessToken) {
    throw new CustomError(403, 'Access Token or Kakao ID is not valid');
  }
  const ttl = promisify(redisClient.ttl).bind(redisClient);
  log.debug('TTL ', ttl);
  return await ttl(KEY);
};

export const getRefreshTokenByTTLOnRedisServer = async (
  accessToken: string,
  userId: string,
): Promise<string> => {
  // TODO: validate this logic in controller or additional DTO type class
  if (!accessToken || !userId) {
    throw new ResourceNotFoundError();
  }
  const ACCESS_KEY = (ACCESS_TOKEN_PREFIX + userId).replace(/['"]+/g, '');
  log.debug('ACCESS KEY ', ACCESS_KEY);
  const REFRESH_KEY = (REFRESH_TOKEN_PREFIX + userId).replace(/['"]+/g, '');

  // TODO; need to fix this error hanling not working well
  redisClient.get(ACCESS_KEY, (err, value) => {
    // log.debug("VALUE, ", value, "accessToken ", accessToken, "COMPARE ", value == accessToken)
    if (!(value == accessToken)) {
      log.debug(' >>>>>>>> accessToken not matched ', value);
      return;
      // throw new AccessTokenExpiredError();
    }
  });

  const getAsync = promisify(redisClient.get).bind(redisClient);
  return await getAsync(REFRESH_KEY);
};

const checkAccessTokenExpirySecondsToKakaoServer = async (accessToken: string): Promise<number> => {
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

// export const updateAccessTokenByRefreshToken = async (
//   userId: string,
//   accessToken: string,
// ): Promise<object> => {
//   let refreshToken = await getRefreshTokenByTTLOnRedisServer(accessToken, userId);
//   const payload = new URLSearchParams();
//   payload.append('grant_type', 'refresh_token');
//   payload.append('refresh_token', refreshToken);
//   payload.append('client_id', process.env.KAKAO_CLIENT_ID);
//
//   log.debug('payload >>>> ', payload);
//   log.debug('userId >>>>', userId);
//   log.debug('accessToken >>>>', accessToken);
//
//   const config = {
//     headers: {
//       'Content-Type': CONTENT_TYPE,
//     },
//   };
//
//   const {
//     data: { access_token, expires_in, refresh_token, refresh_token_expires_in },
//   } = await axios.post(OAUTH_TOKEN, payload, config);
//
//   const updatedAccessTokenDTO = new UpdatedAccessTokenDTO(
//     access_token,
//     expires_in,
//     refresh_token,
//     refresh_token_expires_in,
//   );
//
//   log.info(refresh_token, refresh_token_expires_in);
//   log.debug('updatedAccessTokenDTO ', updatedAccessTokenDTO);
//   if (updatedAccessTokenDTO.doesRetrievedAccessOrRefreshTokenExist()) {
//     await updateTokensAtRedisWithUserIdWithWrappedDTO(userId, updatedAccessTokenDTO);
//   }
//
//   return {
//     access_token,
//     expires_in,
//   };
// };

export const getAccessTokenAndUserIdByCode = async (code: string): Promise<{ accessToken: string; userId: string }> => {
  const ACCESS_TOKEN = "AT " + code;
  const USER_ID = "UD " + code;

  const getAsync = promisify(redisClient.get).bind(redisClient);
  const ACCESS_TOKEN_KEY_ON_REDIS = await getAsync(ACCESS_TOKEN);
  log.debug("ACCESS_TOKEN_KEY_ON_REDIS ", ACCESS_TOKEN_KEY_ON_REDIS);

  const USER_ID_ON_REDIS = await getAsync(USER_ID);
  log.debug("USER_ID_ON_REDIS ", USER_ID_ON_REDIS);

  return {
    accessToken: ACCESS_TOKEN_KEY_ON_REDIS,
    userId: USER_ID_ON_REDIS,
  }
}


export const getAccessTokenAndUserIdByCode = async (
  code: string,
): Promise<{ accessToken: string; userId: string }> => {
  const ACCESS_TOKEN = 'AT ' + code;
  const USER_ID = 'UD ' + code;

  const getAsync = promisify(redisClient.get).bind(redisClient);
  const ACCESS_TOKEN_KEY_ON_REDIS = await getAsync(ACCESS_TOKEN);
  log.debug('ACCESS_TOKEN_KEY_ON_REDIS ', ACCESS_TOKEN_KEY_ON_REDIS);

  const USER_ID_ON_REDIS = await getAsync(USER_ID);
  log.debug('USER_ID_ON_REDIS ', USER_ID_ON_REDIS);

  return {
    accessToken: ACCESS_TOKEN_KEY_ON_REDIS,
    userId: USER_ID_ON_REDIS,
  };
};

export const saveTokensAtRedisWithUserId = async (
  userId: string,
  accessToken: string,
  refreshToken: string,
  code: any
): Promise<void> => {
  // const ACCESS_TOKEN = ACCESS_TOKEN_PREFIX;
  // const REFRESH_TOKEN = REFRESH_TOKEN_PREFIX;
  const ACCESS_TOKEN = "AT " + code;
  const USER_ID = "UD " + code;
  promisify(redisClient.get).bind(redisClient);
  // TODO: move validation logic to other class
  if (accessToken !== 'NONE') {
    await redisClient.setex(ACCESS_TOKEN, DEFAULT_ACCESS_TOKEN_EXPIRATION_SECONDS, accessToken);
  }
  if (userId !== 'NONE') {
    await redisClient.setex(REFRESH_TOKEN, DEFAULT_REFRESH_TOKEN_EXPIRATION_SECONDS, userId);
  }
  return;
};

export const getAccessTokenByCode = async (_code: string) => {
  log.debug('getAccessTokenByCode ', _code);
  const { data } = await axios.post(OAUTH_TOKEN, {
    grant_type: 'authorization_code',
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    code: _code,
  });
  log.debug('getAccessTokenByCode ', data);
  return data;
};

export const getKakaoRawInfo = async (
  _accessToken: string,
  userId: string,
): Promise<KakaoRawInfo> => {
  const accessToken = await doesAccessTokenExpire(_accessToken, userId);
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

export const loginUserWithKakao = async (
  accessToken: string,
  userId: string,
): Promise<UserInfo> => {
  if (await doesAccessTokenExpire(accessToken, userId)) {
    log.debug('acc, us', accessToken, userId);
    throw new AccessTokenExpiredError();
  }
  const kakaoRawInfo = await getKakaoRawInfo(accessToken, userId);
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
  if (await doesAccessTokenExpire(accessToken, userId)) {
    throw new AccessTokenExpiredError();
  }

  await verifyUserAlreadyExistsByKakaoId(userId);
  const kakaoRawInfo = await getKakaoRawInfo(accessToken, userId);
  const newUser = User.fromKakaoRawInfo(kakaoRawInfo);
  const userCommandRepository = await getConnectionToUserCommandRepository();

  return await userCommandRepository.registerOrSaveUser(newUser);
};

// TODO: refactor by splitting to AuthService from UserService
export const doesAccessTokenExists = async (
  accessToken: string,
  userId: string,
): Promise<boolean> => {
  log.debug(' before expiry seconds validation ', accessToken);
  const expire_in: number = await checkAccessTokenExpiryTTLToRedisServer(accessToken, userId);
  return expire_in < 0;
};

export const logOutUserWithKakao = async (
  _accessToken: string,
  _userId: string,
): Promise<string> => {
  if (await doesAccessTokenExists(_accessToken, _userId)) {
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

export const getAllFavoriteNewsList = async (
  accessToken: string,
  kakaoId: string,
): Promise<UserFavoriteNewsReturnDTO> => {
  if (await doesAccessTokenExpire(accessToken, kakaoId)) {
    throw new AccessTokenExpiredError();
  }
  const userQueryRepository = await getConnectionToUserQueryRepository();
  const toBeUpdatedUser = await userQueryRepository.findByKakaoIdActiveRecordManner(kakaoId);
  const favoriteNews = await toBeUpdatedUser.getFavoriteNews();
  const favoriteNewsTagList = await NewsService.searchTagsByNewsIds(favoriteNews);
  const returnWrappedCollectionOfFavoriteNews = new NewsReturnDTOCollection(
    favoriteNews,
    favoriteNewsTagList,
  ).toNewsReturnDTOList();

  return {
    kakaoId: kakaoId,
    favoriteNews: returnWrappedCollectionOfFavoriteNews,
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

export const addNewFavoriteNews = async (
  accessToken: string,
  kakaoId: string,
  newsId: string,
): Promise<NewsReturnDTO[]> => {
  if (await doesAccessTokenExpire(accessToken, kakaoId)) {
    throw new AccessTokenExpiredError();
  }
  const userQueryRepository = await getConnectionToUserQueryRepository();
  const pendingFavoriteNews = await NewsService.searchByNewsId(newsId);
  const toBeUpdatedUser = await userQueryRepository.findByKakaoIdActiveRecordManner(kakaoId);

  await toBeUpdatedUser.addFavoriteNews(pendingFavoriteNews);
  const favoriteNews = await toBeUpdatedUser.getFavoriteNews();
  const favoriteNewsTagList = await NewsService.searchTagsByNewsIds(favoriteNews);

  return new NewsReturnDTOCollection(favoriteNews, favoriteNewsTagList).toNewsReturnDTOList();
};

export const removeFavoriteNews = async (kakaoId: string, newsId: string): Promise<UserInfo> => {
  const userQueryRepository = await getConnectionToUserQueryRepository();
  const toBeforeUpdatedUser = await userQueryRepository.findByKakaoIdActiveRecordManner(kakaoId);
  const pendingRemovedNews = await NewsService.searchByNewsId(newsId);

  const toAfterUpdatedUser = await toBeforeUpdatedUser.removeFavoriteNews(pendingRemovedNews);
  return await updateExistingUser(toAfterUpdatedUser);
};

const searchByKakaoId = async (kakaoId: string) => {
  const userQueryRepository = await getConnectionToUserQueryRepository();
  try {
    return await userQueryRepository.findByKakaoId(kakaoId);
  } catch {
    log.debug('meow');
    // TODO: need an another handler for this error
    throw new CustomError(404, 'User Not Found');
  }
};

export default {
  loginUserWithKakao,
  signUpUserWithKakao,
  logOutUserWithKakao,
  findUserByEmail,
  getKakaoRawInfo,
  doesAccessTokenExpire,
  // updateTokensAtRedisWithUserIdWithWrappedDTO,
  checkAccessTokenExpiryTTLToRedisServer,
  saveTokensAtRedisWithUserId,
  // updateAccessTokenByRefreshToken,
  getAllFavoriteNewsList,
  addNewFavoriteNews,
  removeFavoriteNews,
  findUserByKakaoId,
  searchByUserId: searchByKakaoId,
  updateExistingUser,
  getAccessTokenAndUserIdByCode,
  getAccessTokenByCode,
};
