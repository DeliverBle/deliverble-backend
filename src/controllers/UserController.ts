import { Request, Response } from 'express';
import UserService, { getKakaoRawInfo } from '../service/UserService';
import { Logger } from 'tslog';
import StatusCode from '../modules/statusCode';
import message from '../modules/responseMessage';

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

const getTokensParsedFromBody = async (body: string) => {
  log.info('body', body);
  const accessToken = body['access_token'];
  const refreshToken = body['refresh_token'];
  return {
    accessToken,
    refreshToken,
  };
};

const getTokensAndUserIdParsedFromBody = async (body: string) => {
  log.info('body', body);
  const accessToken = body['access_token'];
  const refreshToken = body['refresh_token'];
  const newsId = body['news_id'];
  // TODO: 생각보다 컨트롤러가 비대한데... 책임을 분리할 방법은 없을까...
  const userId = (await getKakaoRawInfo(accessToken)).kakaoId;
  log.debug(accessToken, refreshToken, newsId, userId);
  return {
    accessToken,
    refreshToken,
    userId,
    newsId
  };
};

const getTokensAndUserIdParsedFromHeader = async (req: any) => {
  log.info('req', req.header('access_token'));
  const accessToken = req.header('access_token');
  const refreshToken = req.header('refresh_token');
  // TODO: 생각보다 컨트롤러가 비대한데... 책임을 분리할 방법은 없을까...
  const userId = (await getKakaoRawInfo(accessToken)).kakaoId;
  return {
    accessToken,
    refreshToken,
    userId,
  };
};

const getTokensAndIdCallbackFromKakao = async (req: Request) => {
  const accessToken = req['user'][0];
  const refreshToken = req['user'][1];
  const userId = (await getKakaoRawInfo(accessToken)).kakaoId;
  return {
    accessToken,
    refreshToken,
    userId,
  };
};

const getUserIdParsedFromBody = (body: string): string => {
  return body['user_id'].toString();
};

export const callbackKakao = async (req: Request, res: Response): Promise<void | Response> => {
  const tokensAndUserId = await getTokensAndIdCallbackFromKakao(req);
  const accessToken = tokensAndUserId.accessToken;
  const refreshToken = tokensAndUserId.refreshToken;
  const userId = tokensAndUserId.userId;
  const accessTokenExpiresIn = await UserService.checkAccessTokenExpirySeconds(accessToken);
  await UserService.saveRefreshTokenAtRedisMappedByUserId(userId, accessToken, refreshToken);

  log.debug(accessToken, refreshToken, accessTokenExpiresIn, userId);

  res.status(StatusCode.OK).send({
    status: StatusCode.OK,
    message: {
      accessToken: accessToken,
      refreshToken: refreshToken,
      userId,
      expired_in: {
        accessTokenInSeconds: accessTokenExpiresIn,
      },
    },
  });
};

const loginUserWithKakao = async (req: Request, res: Response) => {
  const tokensAndUserId = await getTokensAndUserIdParsedFromBody(req.body);
  const accessToken = tokensAndUserId.accessToken;
  const userId = tokensAndUserId.userId;

  log.debug(accessToken);

  try {
    const user = await UserService.loginUserWithKakao(accessToken);
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        logged: 'success',
        user,
      },
    });
  } catch (err) {
    log.error(err);
    res.status(err.code).send({
      status: err.code,
      message: {
        logged: 'fail',
        message: err.message,
      },
    });
  }
};

const logOutUserWithKakao = async (req: Request, res: Response) => {
  const accessToken = (await getTokensParsedFromBody(req.body)).accessToken;

  try {
    const userId = await UserService.logOutUserWithKakao(accessToken);
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        refresh: 'success',
        userId,
      },
    });
  } catch (err) {
    log.error(err.code);
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

const signUpUserWithKakao = async (req: Request, res: Response) => {
  const tokensAndUserId = await getTokensAndUserIdParsedFromBody(req.body);
  const accessToken = tokensAndUserId.accessToken;
  const userId = tokensAndUserId.userId;

  try {
    const signedUpUser = await UserService.signUpUserWithKakao(accessToken, userId);
    log.info(signedUpUser);
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        signup: 'success',
        userId,
      },
    });
  } catch (err) {
    log.error(err);
    res.status(err.code).send({
      status: err.code,
      message: {
        signup: 'fail',
        message: err.message,
      },
    });
  }
};

const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = (await getTokensAndUserIdParsedFromBody(req.body)).refreshToken;
  const userId = getUserIdParsedFromBody(req.body);

  try {
    const retrievedAccessToken = await UserService.updateAccessTokenByRefreshToken(
      userId,
      refreshToken,
    );
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        refresh: 'success',
        retrievedAccessToken,
        userId,
      },
    });
  } catch (err) {
    log.error(err.response.status);
    res.status(err.response.status).send({
      status: err.response.status,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

export const getAllFavoriteNewsList = async (req: Request, res: Response) => {
  const userId = (await getTokensAndUserIdParsedFromHeader(req)).userId;
  try {
    const favoriteNewsListWithUserId = await UserService.getAllFavoriteNewsList(userId);
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: favoriteNewsListWithUserId,
    });
  } catch (err) {
    log.error(err);
    res.status(err.code).send({
      status: err.code,
      message: {
        favoriteNewsList: 'fail',
        message: err.message,
      },
    });
  }
};

export const addFavoriteNews = async (req: Request, res: Response) => {
  log.debug('addFavroiteNews Method Started')
  const ids = await getTokensAndUserIdParsedFromBody(req.body);
  const userId = ids.userId;
  const newsId = ids.newsId;
  try {
    const favoriteNewsListWithUserId = await UserService.addNewFavoriteNews(userId, newsId);
    log.debug(favoriteNewsListWithUserId)
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: favoriteNewsListWithUserId,
    });
  } catch (err) {
    log.error(err);
    res.status(err.code).send({
      status: err.code,
      message: {
        favoriteNewsList: 'fail',
        message: err.message,
      },
    });
  }
};

export const removeFavoriteNews = async (req: Request, res: Response) => {
  log.debug('addFavoriteNews Method Started')
  const ids = await getTokensAndUserIdParsedFromBody(req.body);
  const userId = ids.userId;
  const newsId = ids.newsId;
  try {
    const favoriteNewsListWithUserId = await UserService.removeFavoriteNews(userId, newsId);
    log.debug(favoriteNewsListWithUserId)
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: favoriteNewsListWithUserId,
    });
  } catch (err) {
    log.error(err);
    res.status(err.code).send({
      status: err.code,
      message: {
        favoriteNewsList: 'fail',
        message: err.message,
      },
    });
  }
}

export default {
  loginUserWithKakao,
  signUpUserWithKakao,
  logOutUserWithKakao,
  callbackKakao,
  refreshAccessToken,
  getAllFavoriteNewsList,
  addFavoriteNews,
  removeFavoriteNews
};
