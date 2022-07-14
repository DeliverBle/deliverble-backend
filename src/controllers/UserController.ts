import { Request, Response } from 'express';
import UserService from '../service/UserService';
import { Logger } from 'tslog';
import StatusCode from '../modules/statusCode';

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

const getTokensParsedFromBody = (body: string) => {
  const accessToken = body['access_token'];
  const refreshToken = body['refresh_token'];
  return {
    accessToken,
    refreshToken,
  }
}

const getTokensCallbackFromKakao = (req: Request) => {
  const accessToken = req['user'][0];
  const refreshToken = req['user'][1];
  return {
    accessToken,
    refreshToken,
  }
}

export const callbackKakao = async (req: Request, res: Response): Promise<void | Response> => {
  const accessToken = (getTokensCallbackFromKakao(req)).accessToken;
  const refreshToken = (getTokensCallbackFromKakao(req)).refreshToken;
  const accessTokenExpiresIn = await UserService.checkAccessTokenExpirySeconds(accessToken);
  log.debug(accessToken, refreshToken, accessTokenExpiresIn);
  res.status(StatusCode.OK).send({
    status: StatusCode.OK,
    message: {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expired_in: {
        accessTokenInSeconds: accessTokenExpiresIn,
      },
    },
  });
};

const loginUserWithKakao = async (req: Request, res: Response) => {
  const accessToken = (getTokensParsedFromBody(req.body)).accessToken;
  const refreshToken = (getTokensParsedFromBody(req.body)).refreshToken;
  log.debug(accessToken, refreshToken);
  try {
    await UserService.loginUserWithKakao(accessToken, refreshToken);
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        logged: 'success',
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
  const accessToken = (getTokensParsedFromBody(req.body)).accessToken;
  const refreshToken = (getTokensParsedFromBody(req.body)).refreshToken;
  try {
    await UserService.signUpUserWithKakao(accessToken, refreshToken);
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        signup: 'success',
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
  const refreshToken = (getTokensParsedFromBody(req.body)).refreshToken;
  try {
    const retrievedRefreshToken = await UserService.updateAccessTokenByRefreshToken(refreshToken);
    res.status(StatusCode.OK).send({
      status: StatusCode.OK,
      message: {
        refresh: 'success',
        refreshToken: retrievedRefreshToken,
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
