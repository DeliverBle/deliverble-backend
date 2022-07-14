import { Request, Response } from 'express';
import UserService from '../service/UserService';
import { Logger } from 'tslog';
import StatusCode from '../modules/statusCode';

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

export const callbackKakao = async (req: Request, res: Response): Promise<void | Response> => {
  const accessToken = req['user'][0];
  const refreshToken = req['user'][1];
  const accessTokenExpiresIn = await UserService.checkAccessTokenExpirySeconds(accessToken);
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
  const accessToken = req.body.accessToken!;
  const refreshToken = req.body.refreshToken!;
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
  const accessToken = req.body.accessToken!;
  const refreshToken = req.body.refreshToken!;
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
  const refreshToken = req.body.refreshToken!;
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
