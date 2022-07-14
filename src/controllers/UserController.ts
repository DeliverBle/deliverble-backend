import {Request, Response} from 'express';
import UserService, {getKakaoRawInfo} from '../service/UserService';
import {Logger} from 'tslog';
import StatusCode from '../modules/statusCode';

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

const getTokensAndUserIdParsedFromBody = async (body: string) => {
  const accessToken = body['access_token'];
  const refreshToken = body['refresh_token'];
  // TODO: 생각보다 컨트롤러가 비대한데... 책임을 분리할 방법은 없을까...
  const userId = (await getKakaoRawInfo(accessToken)).id;
  return {
    accessToken,
    refreshToken,
    userId
  }
}

const getTokensAndIdCallbackFromKakao = async (req: Request) => {
  const accessToken = req['user'][0];
  const refreshToken = req['user'][1];
  const userId = (await getKakaoRawInfo(accessToken)).id;
  return {
    accessToken,
    refreshToken,
    userId
  }
}

const getUserIdParsedFromBody = (body: string): number => {
  return body['user_id'];
}

export const callbackKakao = async (req: Request, res: Response): Promise<void | Response> => {
  log.debug(" > req", req);
  const tokensAndUserId = await getTokensAndIdCallbackFromKakao(req);
  const accessToken = tokensAndUserId.accessToken;
  const refreshToken = tokensAndUserId.refreshToken;
  const userId = tokensAndUserId.userId;
  const accessTokenExpiresIn = await UserService.checkAccessTokenExpirySeconds(accessToken);
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
  const tokensAndUserId = await (getTokensAndUserIdParsedFromBody(req.body));
  const accessToken = tokensAndUserId.accessToken;
  const refreshToken = tokensAndUserId.refreshToken;
  const userId = tokensAndUserId.userId;
  log.debug(accessToken, refreshToken);
  try {
    await UserService.loginUserWithKakao(accessToken, refreshToken);
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        logged: 'success',
        userId
      },
    });
  } catch (err) {
    log.error(err.response.status);
    res.status(err.response.status).send({
      status: err.response.status,
      message: {
        logged: 'fail',
        message: err.message,
      },
    });
  }
};

const signUpUserWithKakao = async (req: Request, res: Response) => {
  const tokensAndUserId = await (getTokensAndUserIdParsedFromBody(req.body));
  const accessToken = tokensAndUserId.accessToken;
  const userId = tokensAndUserId.userId;
  try {
    await UserService.signUpUserWithKakao(accessToken);
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        signup: 'success',
        userId
      },
    });
  } catch (err) {
    log.error(err.response.status);
    res.status(err.response.status).send({
      status: err.response.status,
      message: {
        signup: 'fail',
        message: err.message,
      },
    });
  }
};

const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = (await (getTokensAndUserIdParsedFromBody(req.body))).refreshToken;
  const userId = getUserIdParsedFromBody(req.body);
  try {
    const retrievedAccessToken = await UserService.updateAccessTokenByRefreshToken(userId, refreshToken);
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        refresh: 'success',
        retrievedAccessToken,
        userId
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

export default {
  loginUserWithKakao,
  signUpUserWithKakao,
  callbackKakao,
  refreshAccessToken,
};
