import { Request, Response } from 'express';
import UserService, { getKakaoRawInfo } from '../service/UserService';
import { Logger } from 'tslog';
import StatusCode from '../modules/statusCode';
import {promisify} from "util";
// import redisClient from "../util/redis";
import {DEFAULT_ACCESS_TOKEN_EXPIRATION_SECONDS, DEFAULT_REFRESH_TOKEN_EXPIRATION_SECONDS} from "../shared/AuthLink";
import redis from 'redis';
import CustomError from "../error/CustomError";

// redis setting
const port = 6379;
const host = 'localhost';
const password = 'changeme';
const redisClient = redis.createClient(port, host);
redisClient.auth(password);

redisClient.on('connect', function () {
  log.info('Redis plugged in.');
});

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

const getAccessTokenByCode = async (req: Request, res: Response) => {
  const code = req.query.code;
  let data;
  try {
    data = UserService.getAccessTokenByCode(code.toString());
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        data
      }
    });
  } catch (err) {
    // TODO: Error 지금 서로 규격이 다른데 어떻게 해야 표준화가 가능할까를 고민해보자.
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
}

const getTokensParsedFromBody = async (body: string) => {
  log.info('body', body);
  const accessToken = body['access_token'];
  const refreshToken = body['refresh_token'];
  const userId = body['user_id'];
  log.debug(userId);
  return {
    accessToken,
    refreshToken,
    userId,
  };
};

const getTokensAndUserIdParsedFromBody = async (body: string) => {
  log.info('body', body);
  const accessToken = body['access_token'];
  const refreshToken = body['refresh_token'];
  const newsId = body['news_id'];
  // TODO: 생각보다 컨트롤러가 비대한데... 책임을 분리할 방법은 없을까...
  let userId = body['user_id'];
  userId = userId.replace(/['"]+/g, '');
  // const userId = (await getKakaoRawInfo(accessToken)).kakaoId;
  log.debug(accessToken, refreshToken, newsId, userId);
  return {
    accessToken,
    refreshToken,
    userId,
    newsId,
  };
};

const getTokensAndIdCallbackFromKakao = async (req: Request) => {
  const accessToken = req['user'][0];
  const refreshToken = req['user'][1];
  const kakaoId = req['user'][2].toString();
  return {
    accessToken,
    refreshToken,
    kakaoId,
  };
};

const getUserIdParsedFromBody = (body: string) => {
  log.debug(' >>>>>>>>>>>>>>>> ', body['user_id']);
  return body['user_id'];
};

export const callbackKakao = async (req: Request, res: Response): Promise<void | Response> => {
  const code = req.query.code;
  const tokensAndUserId = await getTokensAndIdCallbackFromKakao(req);
  const accessToken = tokensAndUserId.accessToken;
  const refreshToken = tokensAndUserId.refreshToken;
  const userId = tokensAndUserId.kakaoId;
  // TODO: initial callback to save refreshToken at Redis with userId
  // await UserService.saveTokensAtRedisWithUserId(userId, accessToken, refreshToken, code);
  const ACCESS_TOKEN = "AT " + code;
  const USER_ID = "UD " + code;
  promisify(redisClient.get).bind(redisClient);
  // TODO: move validation logic to other class
  log.debug("82 >>>>> ", ACCESS_TOKEN, USER_ID);
  await redisClient.setex(
        ACCESS_TOKEN,
        DEFAULT_ACCESS_TOKEN_EXPIRATION_SECONDS,
        accessToken,
  );
  log.debug("88 >>>>> ", ACCESS_TOKEN, USER_ID);
  await redisClient.setex(
        USER_ID,
        DEFAULT_REFRESH_TOKEN_EXPIRATION_SECONDS,
        userId,
  );
  log.debug("94 >>>>> ", ACCESS_TOKEN, USER_ID);
  res.status(StatusCode.OK).send({
    status: StatusCode.OK,
    message: {
      accessToken: accessToken,
      expired_in: 21600,
      userId,
    },
  });
};

const loginUserWithKakao = async (req: Request, res: Response) => {
  const tokensAndUserId = await getTokensAndUserIdParsedFromBody(req.body);
  const accessToken = tokensAndUserId.accessToken;
  let userId = tokensAndUserId.userId;
  userId = userId.replace(/['"]+/g, '');

  log.debug(accessToken);

  try {
    const user = await UserService.loginUserWithKakao(accessToken, userId);
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        logged: 'success',
        user,
      },
    });
  } catch (err) {
    // TODO: Error 지금 서로 규격이 다른데 어떻게 해야 표준화가 가능할까를 고민해보자.
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

const logOutUserWithKakao = async (req: Request, res: Response) => {
  const tokensAndUserId = await getTokensParsedFromBody(req.body);
  const accessToken = tokensAndUserId.accessToken;
  const userId = tokensAndUserId.userId;

  try {
    await UserService.logOutUserWithKakao(accessToken, userId);
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        refresh: 'success',
        userId,
      },
    });
  } catch (err) {
    // TODO: Error 지금 서로 규격이 다른데 어떻게 해야 표준화가 가능할까를 고민해보자.
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
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
    // TODO: Error 지금 서로 규격이 다른데 어떻게 해야 표준화가 가능할까를 고민해보자.
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

const getAccessTokenAndUserIdByCode = async (req: Request, res: Response) => {
  const code = req.query.code.toString();
  log.debug(' code : ', code);
  
  try {
    const tokensAndUserId = await UserService.getAccessTokenAndUserIdByCode(code);
    const accessToken = tokensAndUserId.accessToken;
    const userId = tokensAndUserId.userId;

    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        accessToken: accessToken,
        expired_in: 21600,
        userId,
      },
    });
  } catch (err) {
    // TODO: Error 지금 서로 규격이 다른데 어떻게 해야 표준화가 가능할까를 고민해보자.
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

const refreshAccessToken = async (req: Request, res: Response) => {
  const accessToken = (await getTokensAndUserIdParsedFromBody(req.body)).accessToken;
  let userId = getUserIdParsedFromBody(req.body);
  log.debug("userId >>>>>>>>>>>>>>>>>> ", userId);
  userId = userId.replace(/['"]+/g, '');

  try {
    const tokensAndUserId = await UserService.getAccessTokenAndUserIdByCode(code);
    const accessToken = tokensAndUserId.accessToken;
    const userId = tokensAndUserId.userId;

    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        accessToken: accessToken,
        expired_in: 21600,
        userId,
      },
    });
  } catch (err) {
    // TODO: Error 지금 서로 규격이 다른데 어떻게 해야 표준화가 가능할까를 고민해보자.
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

export const getAllFavoriteNewsList = async (req: Request, res: Response) => {
  log.debug(req.header('access_token'));
  const tokensAndId = await getTokensAndUserIdParsedFromBody(req.body);
  log.debug(tokensAndId);
  const accessToken = tokensAndId.accessToken;
  const kakaoId = tokensAndId.userId;
  try {
    const favoriteNewsListWithUserId = await UserService.getAllFavoriteNewsList(
      accessToken,
      kakaoId,
    );
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: favoriteNewsListWithUserId,
    });
  } catch (err) {
    // TODO: Error 지금 서로 규격이 다른데 어떻게 해야 표준화가 가능할까를 고민해보자.
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

export const addFavoriteNews = async (req: Request, res: Response) => {
  const ids = await getTokensAndUserIdParsedFromBody(req.body);
  const accessToken = ids.accessToken;
  const userId = ids.userId;
  const newsId = ids.newsId;
  try {
    const favoriteNewsListWithUserId = await UserService.addNewFavoriteNews(
      accessToken,
      userId,
      newsId,
    );
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: favoriteNewsListWithUserId,
    });
  } catch (err) {
    // TODO: Error 지금 서로 규격이 다른데 어떻게 해야 표준화가 가능할까를 고민해보자.
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

export const removeFavoriteNews = async (req: Request, res: Response) => {
  log.debug('addFavoriteNews Method Started');
  const ids = await getTokensAndUserIdParsedFromBody(req.body);
  const userId = ids.userId;
  const newsId = ids.newsId;
  try {
    const favoriteNewsListWithUserId = await UserService.removeFavoriteNews(userId, newsId);
    log.debug(favoriteNewsListWithUserId);
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: favoriteNewsListWithUserId,
    });
  } catch (err) {
    log.error(err);
    // TODO: Error 지금 서로 규격이 다른데 어떻게 해야 표준화가 가능할까를 고민해보자.
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

export default {
  loginUserWithKakao,
  signUpUserWithKakao,
  logOutUserWithKakao,
  callbackKakao,
  getAccessTokenAndUserIdByCode,
  refreshAccessToken,
  getAllFavoriteNewsList,
  addFavoriteNews,
  removeFavoriteNews,
  getTokensParsedFromBody,
  getAccessTokenByCode
};
