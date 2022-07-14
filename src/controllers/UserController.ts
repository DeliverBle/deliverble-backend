import {Request, Response} from "express";
import {getKakaoRawInfo} from "../service/UserService";

export const callbackKakao = async (req: Request, res: Response): Promise<void | Response> => {
    console.log(">>>>>>>> req", req['user'])
    const accessToken = req['user'][0];
    const refreshToken = req['user'][1];
    res.send(
        {
            "status": 200,
            "message": {
                "accessToken": accessToken,
                "refreshToken": refreshToken,
                "expired_in": {
                    "accessToken": "12 hours",
                    "refreshToken": "30 days"
                }
            }
        }
    )
};

const loginUserWithKakao = async (req: Request, res: Response) => {
    const accessToken = req.body.accessToken!;
    const refreshToken = req.body.refreshToken!;
    res.send(await getKakaoRawInfo(accessToken, refreshToken));
}

export default {
    loginUserWithKakao,
    callbackKakao,
};