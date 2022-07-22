"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavoriteNews = exports.addFavoriteNews = exports.getAllFavoriteNewsList = exports.callbackKakao = void 0;
const UserService_1 = __importDefault(require("../service/UserService"));
const tslog_1 = require("tslog");
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const util_1 = require("util");
// import redisClient from "../util/redis";
const AuthLink_1 = require("../shared/AuthLink");
const redis_1 = __importDefault(require("redis"));
// redis setting
const port = 6379;
const host = 'localhost';
const password = 'changeme';
const redisClient = redis_1.default.createClient(port, host);
redisClient.auth(password);
redisClient.on('connect', function () {
    log.info('Redis plugged in.');
});
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
const getAccessTokenByCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    let tokenInfo;
    let userInfo;
    try {
        tokenInfo = yield UserService_1.default.getAccessTokenByCode(code.toString());
        const access_token = tokenInfo.access_token;
        userInfo = yield UserService_1.default.getKakaoRawInfo(access_token, "");
        res.status(statusCode_1.default.OK).send({
            status: statusCode_1.default.OK,
            message: {
                tokenInfo,
                userInfo
            }
        });
    }
    catch (err) {
        // TODO: Error 지금 서로 규격이 다른데 어떻게 해야 표준화가 가능할까를 고민해보자.
        if (err.response !== undefined) {
            // log.error(err.response.status);
            res.status(err.response.status).send({
                status: err.response.status,
                message: {
                    refresh: 'fail',
                    message: err.response.message,
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
});
const getTokensParsedFromBody = (body) => __awaiter(void 0, void 0, void 0, function* () {
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
});
const getTokensAndUserIdParsedFromBody = (body) => __awaiter(void 0, void 0, void 0, function* () {
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
});
const getTokensAndIdCallbackFromKakao = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req['user'][0];
    const refreshToken = req['user'][1];
    const kakaoId = req['user'][2].toString();
    return {
        accessToken,
        refreshToken,
        kakaoId,
    };
});
const getUserIdParsedFromBody = (body) => {
    log.debug(' >>>>>>>>>>>>>>>> ', body['user_id']);
    return body['user_id'];
};
const callbackKakao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    const tokensAndUserId = yield getTokensAndIdCallbackFromKakao(req);
    const accessToken = tokensAndUserId.accessToken;
    const refreshToken = tokensAndUserId.refreshToken;
    const userId = tokensAndUserId.kakaoId;
    // TODO: initial callback to save refreshToken at Redis with userId
    // await UserService.saveTokensAtRedisWithUserId(userId, accessToken, refreshToken, code);
    const ACCESS_TOKEN = "AT " + code;
    const USER_ID = "UD " + code;
    (0, util_1.promisify)(redisClient.get).bind(redisClient);
    // TODO: move validation logic to other class
    log.debug("82 >>>>> ", ACCESS_TOKEN, USER_ID);
    yield redisClient.setex(ACCESS_TOKEN, AuthLink_1.DEFAULT_ACCESS_TOKEN_EXPIRATION_SECONDS, accessToken);
    log.debug("88 >>>>> ", ACCESS_TOKEN, USER_ID);
    yield redisClient.setex(USER_ID, AuthLink_1.DEFAULT_REFRESH_TOKEN_EXPIRATION_SECONDS, userId);
    log.debug("94 >>>>> ", ACCESS_TOKEN, USER_ID);
    res.status(statusCode_1.default.OK).send({
        status: statusCode_1.default.OK,
        message: {
            accessToken: accessToken,
            expired_in: 21600,
            userId,
        },
    });
});
exports.callbackKakao = callbackKakao;
const loginUserWithKakao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokensAndUserId = yield getTokensAndUserIdParsedFromBody(req.body);
    const accessToken = tokensAndUserId.accessToken;
    let userId = tokensAndUserId.userId;
    userId = userId.replace(/['"]+/g, '');
    log.debug(accessToken);
    try {
        const user = yield UserService_1.default.loginUserWithKakao(accessToken, userId);
        res.status(statusCode_1.default.OK).send({
            status: statusCode_1.default.OK,
            message: {
                logged: 'success',
                user,
            },
        });
    }
    catch (err) {
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
});
const logOutUserWithKakao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokensAndUserId = yield getTokensParsedFromBody(req.body);
    const accessToken = tokensAndUserId.accessToken;
    const userId = tokensAndUserId.userId;
    try {
        yield UserService_1.default.logOutUserWithKakao(accessToken, userId);
        res.status(statusCode_1.default.OK).send({
            status: statusCode_1.default.OK,
            message: {
                refresh: 'success',
                userId,
            },
        });
    }
    catch (err) {
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
});
const signUpUserWithKakao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokensAndUserId = yield getTokensAndUserIdParsedFromBody(req.body);
    const accessToken = tokensAndUserId.accessToken;
    const userId = tokensAndUserId.userId;
    try {
        const signedUpUser = yield UserService_1.default.signUpUserWithKakao(accessToken, userId);
        log.info(signedUpUser);
        res.status(statusCode_1.default.OK).send({
            status: statusCode_1.default.OK,
            message: {
                signup: 'success',
                userId,
            },
        });
    }
    catch (err) {
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
});
const getAccessTokenAndUserIdByCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code.toString();
    log.debug(' code : ', code);
    try {
        const tokensAndUserId = yield UserService_1.default.getAccessTokenAndUserIdByCode(code);
        const accessToken = tokensAndUserId.accessToken;
        const userId = tokensAndUserId.userId;
        log.debug(tokensAndUserId);
        return res.status(statusCode_1.default.OK).send({
            status: statusCode_1.default.OK,
            message: {
                accessToken: accessToken,
                expired_in: 21600,
                userId,
            },
        });
    }
    catch (err) {
        // TODO: Error 지금 서로 규격이 다른데 어떻게 해야 표준화가 가능할까를 고민해보자.
        if (err.response !== undefined) {
            log.error(err.response.status);
            return res.status(err.response.status).send({
                status: err.response.status,
                message: {
                    refresh: 'fail',
                    message: err.message,
                },
            });
        }
        return res.status(err.code).send({
            status: err.code,
            message: {
                refresh: 'fail',
                message: err.message,
            },
        });
    }
});
// const refreshAccessToken = async (req: Request, res: Response) => {
//   const accessToken = (await getTokensAndUserIdParsedFromBody(req.body)).accessToken;
//   let userId = getUserIdParsedFromBody(req.body);
//   log.debug("userId >>>>>>>>>>>>>>>>>> ", userId);
//   userId = userId.replace(/['"]+/g, '');
//
//   try {
//     const retrievedAccessToken = await UserService.updateAccessTokenByRefreshToken(
//       userId,
//       accessToken,
//     );
//     res.status(StatusCode.OK).send({
//       status: StatusCode.OK,
//       message: {
//         refresh: 'success',
//         retrievedAccessToken,
//         userId,
//       },
//     });
//   } catch (err) {
//     // TODO: Error 지금 서로 규격이 다른데 어떻게 해야 표준화가 가능할까를 고민해보자.
//     if (err.response !== undefined) {
//       log.error(err.response.status);
//       res.status(err.response.status).send({
//         status: err.response.status,
//         message: {
//           refresh: 'fail',
//           message: err.message,
//         },
//       });
//     }
//     res.status(err.code).send({
//       status: err.code,
//       message: {
//         refresh: 'fail',
//         message: err.message,
//       },
//     });
//   }
// };
const getAllFavoriteNewsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const tokensAndId = await getTokensAndUserIdParsedFromBody(req.body);
    // log.debug(tokensAndId);
    // const accessToken = tokensAndId.accessToken;
    log.debug('***** header *****', req.header);
    log.debug('access token in header', req.headers['authorization']);
    try {
        // @ts-ignore
        const authorization = req.headers["authorization"].toString().split(" ");
        log.debug("authorization", authorization);
        const accessToken = authorization[0];
        log.debug('req.headers["access_token"]', accessToken);
        // @ts-ignore
        let kakaoId = authorization[1].replace(/['"]+/g, '');
        log.debug('type of accessToken', typeof accessToken);
        log.debug('type of kakaoId', typeof kakaoId);
        const favoriteNewsListWithUserId = yield UserService_1.default.getAllFavoriteNewsList(accessToken, kakaoId);
        return res.status(statusCode_1.default.OK).send({
            status: statusCode_1.default.OK,
            message: favoriteNewsListWithUserId,
        });
    }
    catch (err) {
        // TODO: Error 지금 서로 규격이 다른데 어떻게 해야 표준화가 가능할까를 고민해보자.
        if (err.response !== undefined) {
            log.error(err.response.status);
            return res.status(err.response.status).send({
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
});
exports.getAllFavoriteNewsList = getAllFavoriteNewsList;
const addFavoriteNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = yield getTokensAndUserIdParsedFromBody(req.body);
    const accessToken = ids.accessToken;
    const userId = ids.userId;
    const newsId = ids.newsId;
    try {
        const favoriteNewsListWithUserId = yield UserService_1.default.addNewFavoriteNews(accessToken, userId, newsId);
        res.status(statusCode_1.default.OK).send({
            status: statusCode_1.default.OK,
            message: favoriteNewsListWithUserId,
        });
    }
    catch (err) {
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
});
exports.addFavoriteNews = addFavoriteNews;
const removeFavoriteNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    log.debug('addFavoriteNews Method Started');
    const ids = yield getTokensAndUserIdParsedFromBody(req.body);
    const userId = ids.userId;
    const newsId = ids.newsId;
    try {
        const favoriteNewsListWithUserId = yield UserService_1.default.removeFavoriteNews(userId, newsId);
        log.debug(favoriteNewsListWithUserId);
        res.status(statusCode_1.default.OK).send({
            status: statusCode_1.default.OK,
            message: favoriteNewsListWithUserId,
        });
    }
    catch (err) {
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
});
exports.removeFavoriteNews = removeFavoriteNews;
exports.default = {
    loginUserWithKakao,
    signUpUserWithKakao,
    logOutUserWithKakao,
    callbackKakao: exports.callbackKakao,
    getAccessTokenAndUserIdByCode,
    // refreshAccessToken,
    getAllFavoriteNewsList: exports.getAllFavoriteNewsList,
    addFavoriteNews: exports.addFavoriteNews,
    removeFavoriteNews: exports.removeFavoriteNews,
    getTokensParsedFromBody,
    getAccessTokenByCode
};
//# sourceMappingURL=UserController.js.map