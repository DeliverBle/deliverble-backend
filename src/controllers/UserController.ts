import {Request, Response} from "express";
import {getKakaoRawInfo} from "../service/UserService";
import UserService from "../service/UserService";
import AccessTokenNotExpiredError from "../error/AccessTokenNotExpiredError";

export const callbackKakao = async (req: Request, res: Response): Promise<void | Response> => {
    const accessToken = req['user'][0];
    const refreshToken = req['user'][1];
    const accessTokenExpiresIn = await UserService.checkAccessTokenExpirySeconds(accessToken)
    res.send(
        {
            "status": 200,
            "message": {
                "accessToken": accessToken,
                "refreshToken": refreshToken,
                "expired_in": {
                    "accessTokenInSeconds": accessTokenExpiresIn,
                }
            }
        }
    )
};

const loginUserWithKakao = async (req: Request, res: Response) => {
    const accessToken = req.body.accessToken!;
    const refreshToken = req.body.refreshToken!;
    return UserService.loginUserWithKakao(accessToken, refreshToken);
}

const refreshAccessToken = async (req: Request, res: Response) => {
    const accessToken = req.body.accessToken!;
    const refreshToken = req.body.refreshToken!;
    const doesExpire = await UserService.doesAccessTokenExpire(accessToken, refreshToken);
    if (!doesExpire) {
        throw new AccessTokenNotExpiredError();
    }
    return UserService.updateAccessTokenByRefreshToken(refreshToken);
}

export default {
    loginUserWithKakao,
    callbackKakao,
    refreshAccessToken
};
