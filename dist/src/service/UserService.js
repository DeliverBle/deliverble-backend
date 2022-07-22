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
exports.removeFavoriteNews = exports.addNewFavoriteNews = exports.updateExistingUser = exports.getAllFavoriteNewsList = exports.logOutUserWithKakao = exports.doesAccessTokenExists = exports.signUpUserWithKakao = exports.loginUserWithKakao = exports.getKakaoRawInfo = exports.getAccessTokenByCode = exports.saveTokensAtRedisWithUserId = exports.getAccessTokenAndUserIdByCode = exports.getRefreshTokenByTTLOnRedisServer = exports.checkAccessTokenExpiryTTLToRedisServer = exports.doesAccessTokenExpire = exports.findUserByEmail = exports.findUserByKakaoId = void 0;
const User_1 = require("../entity/User");
const typeorm_1 = require("typeorm");
const UserQueryRepository_1 = require("../repository/UserQueryRepository");
const NotFoundUser_1 = require("../entity/NotFoundUser");
const UserCommandRepository_1 = require("../repository/UserCommandRepository");
const UserNotFoundError_1 = __importDefault(require("../error/UserNotFoundError"));
const types_1 = require("../types");
const axios_1 = __importDefault(require("axios"));
const AuthLink_1 = require("../shared/AuthLink");
const AccessTokenExpiredError_1 = __importDefault(require("../error/AccessTokenExpiredError"));
const util_1 = require("util");
const tslog_1 = require("tslog");
const AlreadyLoggedOutError_1 = __importDefault(require("../error/AlreadyLoggedOutError"));
const AlreadySignedUpError_1 = __importDefault(require("../error/AlreadySignedUpError"));
const NewsService_1 = __importDefault(require("./NewsService"));
const ResourceNotFoundError_1 = __importDefault(require("../error/ResourceNotFoundError"));
const CustomError_1 = __importDefault(require("../error/CustomError"));
const redisClient = require('../util/redis');
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
// TODO: DI to be implemented
const getConnectionToUserQueryRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = (0, typeorm_1.getConnection)();
    return connection.getCustomRepository(UserQueryRepository_1.UserQueryRepository);
});
const getConnectionToUserCommandRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = (0, typeorm_1.getConnection)();
    return connection.getCustomRepository(UserCommandRepository_1.UserCommandRepository);
});
const findUserByKakaoId = (kakaoId) => __awaiter(void 0, void 0, void 0, function* () {
    log.debug('kakao id toString', kakaoId);
    const userQueryRepository = yield getConnectionToUserQueryRepository();
    try {
        return yield userQueryRepository.findByKakaoId(kakaoId);
    }
    catch (error) {
        return new NotFoundUser_1.NotFoundUser();
    }
});
exports.findUserByKakaoId = findUserByKakaoId;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = yield getConnectionToUserQueryRepository();
    try {
        const foundUser = yield userRepository.findByEmail(email);
        log.debug(' >>>>>>>> foundUser ', foundUser);
        return foundUser;
    }
    catch (error) {
        return new NotFoundUser_1.NotFoundUser();
    }
});
exports.findUserByEmail = findUserByEmail;
// TODO: refactor by splitting to AuthService from UserService
const doesAccessTokenExpire = (accessToken, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // log.debug(' before expiry seconds validation ', accessToken);
    // const expire_in: number = await checkAccessTokenExpirySecondsToKakaoServer(accessToken);
    // return expire_in < 0;
    return false;
});
exports.doesAccessTokenExpire = doesAccessTokenExpire;
const checkAccessTokenExpiryTTLToRedisServer = (accessToken, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: validate this logic in controller or additional DTO type class
    log.debug(' HELLO ');
    if (!accessToken || !userId) {
        log.debug(accessToken, userId);
        throw new ResourceNotFoundError_1.default();
    }
    const KEY = AuthLink_1.ACCESS_TOKEN_PREFIX + userId;
    log.debug('KEY ', KEY);
    const getAsync = (0, util_1.promisify)(redisClient.get).bind(redisClient);
    const ACCESS_TOKEN_KEY_ON_REDIS = yield getAsync(KEY);
    if (ACCESS_TOKEN_KEY_ON_REDIS !== accessToken) {
        throw new CustomError_1.default(403, 'Access Token or Kakao ID is not valid');
    }
    const ttl = (0, util_1.promisify)(redisClient.ttl).bind(redisClient);
    log.debug('TTL ', ttl);
    return yield ttl(KEY);
});
exports.checkAccessTokenExpiryTTLToRedisServer = checkAccessTokenExpiryTTLToRedisServer;
const getRefreshTokenByTTLOnRedisServer = (accessToken, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: validate this logic in controller or additional DTO type class
    if (!accessToken || !userId) {
        throw new ResourceNotFoundError_1.default();
    }
    const ACCESS_KEY = (AuthLink_1.ACCESS_TOKEN_PREFIX + userId).replace(/['"]+/g, '');
    log.debug('ACCESS KEY ', ACCESS_KEY);
    const REFRESH_KEY = (AuthLink_1.REFRESH_TOKEN_PREFIX + userId).replace(/['"]+/g, '');
    // TODO; need to fix this error hanling not working well
    redisClient.get(ACCESS_KEY, (err, value) => {
        // log.debug("VALUE, ", value, "accessToken ", accessToken, "COMPARE ", value == accessToken)
        if (!(value == accessToken)) {
            log.debug(' >>>>>>>> accessToken not matched ', value);
            return;
            // throw new AccessTokenExpiredError();
        }
    });
    const getAsync = (0, util_1.promisify)(redisClient.get).bind(redisClient);
    return yield getAsync(REFRESH_KEY);
});
exports.getRefreshTokenByTTLOnRedisServer = getRefreshTokenByTTLOnRedisServer;
const checkAccessTokenExpirySecondsToKakaoServer = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    log.info(' >>>>>>>> accessToken ', accessToken);
    try {
        const { data: expireInfo } = yield axios_1.default.get(AuthLink_1.ACCESS_TOKEN_INFO, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': AuthLink_1.CONTENT_TYPE,
            },
        });
        return expireInfo.expires_in;
    }
    catch (err) {
        throw new AccessTokenExpiredError_1.default();
    }
});
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
const getAccessTokenAndUserIdByCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const ACCESS_TOKEN = 'AT ' + code;
    const USER_ID = 'UD ' + code;
    const getAsync = (0, util_1.promisify)(redisClient.get).bind(redisClient);
    const ACCESS_TOKEN_KEY_ON_REDIS = yield getAsync(ACCESS_TOKEN);
    log.debug('ACCESS_TOKEN_KEY_ON_REDIS ', ACCESS_TOKEN_KEY_ON_REDIS);
    const USER_ID_ON_REDIS = yield getAsync(USER_ID);
    log.debug('USER_ID_ON_REDIS ', USER_ID_ON_REDIS);
    return {
        accessToken: ACCESS_TOKEN_KEY_ON_REDIS,
        userId: USER_ID_ON_REDIS,
    };
});
exports.getAccessTokenAndUserIdByCode = getAccessTokenAndUserIdByCode;
const saveTokensAtRedisWithUserId = (userId, accessToken, refreshToken, code) => __awaiter(void 0, void 0, void 0, function* () {
    // const ACCESS_TOKEN = ACCESS_TOKEN_PREFIX;
    // const REFRESH_TOKEN = REFRESH_TOKEN_PREFIX;
    const ACCESS_TOKEN = 'AT ' + code;
    const USER_ID = 'UD ' + code;
    (0, util_1.promisify)(redisClient.get).bind(redisClient);
    // TODO: move validation logic to other class
    if (accessToken !== 'NONE') {
        yield redisClient.setex(ACCESS_TOKEN, AuthLink_1.DEFAULT_ACCESS_TOKEN_EXPIRATION_SECONDS, accessToken);
    }
    if (userId !== 'NONE') {
        yield redisClient.setex(USER_ID, AuthLink_1.DEFAULT_REFRESH_TOKEN_EXPIRATION_SECONDS, userId);
    }
    return;
});
exports.saveTokensAtRedisWithUserId = saveTokensAtRedisWithUserId;
// export const updateTokensAtRedisWithUserIdWithWrappedDTO = async (
//   userId: string,
//   updatedAccessTokenDTO: UpdatedAccessTokenDTO,
// ): Promise<void> => {
//   // TODO: to be refactored; is it possible to expire each value in Redis?
//   const accessToken = updatedAccessTokenDTO.access_token;
//   const refreshToken = updatedAccessTokenDTO.refresh_token;
//   log.debug(' updateTokensAtRedisWithUserIdWithWrappedDTO ', accessToken, refreshToken);
//   await saveTokensAtRedisWithUserId(userId, accessToken, refreshToken, code);
//   return;
// };
const getAccessTokenByCode = (_code) => __awaiter(void 0, void 0, void 0, function* () {
    log.debug('getAccessTokenByCode ', _code);
    const payload = new URLSearchParams();
    payload.append('grant_type', 'authorization_code');
    payload.append('client_id', process.env.KAKAO_CLIENT_ID);
    payload.append('redirect_uri', process.env.KAKAO_REDIRECT_URI);
    payload.append('code', _code);
    const config = {
        headers: {
            'Content-Type': AuthLink_1.CONTENT_TYPE,
        },
    };
    try {
        const { data: access_token } = yield axios_1.default.post(AuthLink_1.OAUTH_TOKEN, payload);
        console.log(" >>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", access_token);
        log.debug('getAccessTokenByCode ', access_token);
        return access_token;
    }
    catch (err) {
        log.debug(err);
        throw new ResourceNotFoundError_1.default();
    }
});
exports.getAccessTokenByCode = getAccessTokenByCode;
const getKakaoRawInfo = (_accessToken, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield (0, exports.doesAccessTokenExpire)(_accessToken, userId);
    if (accessToken) {
        throw new AccessTokenExpiredError_1.default();
    }
    const { data: userInfo } = yield axios_1.default
        .get(AuthLink_1.REQUEST_RAW_LINK, {
        headers: {
            Authorization: 'Bearer ' + _accessToken,
            'Content-Type': AuthLink_1.CONTENT_TYPE,
        },
    })
        .then((res) => {
        return res;
    });
    const kakaoRawInfo = types_1.KakaoRawInfo.toKakaoRawInfo(userInfo);
    log.debug(kakaoRawInfo);
    return kakaoRawInfo;
});
exports.getKakaoRawInfo = getKakaoRawInfo;
const loginUserWithKakao = (accessToken, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, exports.doesAccessTokenExpire)(accessToken, userId)) {
        log.debug('acc, us', accessToken, userId);
        throw new AccessTokenExpiredError_1.default();
    }
    const kakaoRawInfo = yield (0, exports.getKakaoRawInfo)(accessToken, userId);
    log.debug(" 295 USER >>>>>>>>>>>>>>>> ", kakaoRawInfo);
    const user = yield (0, exports.findUserByKakaoId)(kakaoRawInfo.kakaoId);
    log.debug(' findUserByKakaoId USER >>>> ', user);
    log.debug(' isNotFoundUser ', (0, NotFoundUser_1.isNotFoundUser)(user));
    if ((0, NotFoundUser_1.isNotFoundUser)(user)) {
        log.warn('NOT FOUND USER ', user);
        throw new UserNotFoundError_1.default();
    }
    return new types_1.UserInfo(user);
});
exports.loginUserWithKakao = loginUserWithKakao;
const verifyUserAlreadyExistsByKakaoId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, NotFoundUser_1.isNotFoundUser)(yield (0, exports.findUserByKakaoId)(userId))) {
        throw new AlreadySignedUpError_1.default();
    }
});
// TODO: return user entity with wrapping object DTO
const signUpUserWithKakao = (accessToken, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, exports.doesAccessTokenExpire)(accessToken, userId)) {
        throw new AccessTokenExpiredError_1.default();
    }
    log.debug("accessToken, userId", accessToken, userId);
    yield verifyUserAlreadyExistsByKakaoId(userId);
    log.debug("after VerifyUserAlreadyExistsByKakaoId", userId);
    const kakaoRawInfo = yield (0, exports.getKakaoRawInfo)(accessToken, userId);
    const newUser = User_1.User.fromKakaoRawInfo(kakaoRawInfo);
    const userCommandRepository = yield getConnectionToUserCommandRepository();
    return yield userCommandRepository.registerOrSaveUser(newUser);
});
exports.signUpUserWithKakao = signUpUserWithKakao;
// TODO: refactor by splitting to AuthService from UserService
const doesAccessTokenExists = (accessToken, userId) => __awaiter(void 0, void 0, void 0, function* () {
    log.debug(' before expiry seconds validation ', accessToken);
    const expire_in = yield (0, exports.checkAccessTokenExpiryTTLToRedisServer)(accessToken, userId);
    return expire_in < 0;
});
exports.doesAccessTokenExists = doesAccessTokenExists;
const logOutUserWithKakao = (_accessToken, _userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, exports.doesAccessTokenExists)(_accessToken, _userId)) {
        throw new AlreadyLoggedOutError_1.default();
    }
    const { data: id } = yield axios_1.default
        .get(AuthLink_1.USER_LOGOUT_LINK, {
        headers: {
            Authorization: 'Bearer ' + _accessToken,
            'Content-Type': AuthLink_1.CONTENT_TYPE,
        },
    })
        .then((res) => {
        return res;
    });
    return id;
});
exports.logOutUserWithKakao = logOutUserWithKakao;
const getAllFavoriteNewsList = (accessToken, kakaoId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, exports.doesAccessTokenExpire)(accessToken, kakaoId)) {
        throw new AccessTokenExpiredError_1.default();
    }
    const userQueryRepository = yield getConnectionToUserQueryRepository();
    const toBeUpdatedUser = yield userQueryRepository.findByKakaoIdActiveRecordManner(kakaoId);
    const favoriteNews = yield toBeUpdatedUser.getFavoriteNews();
    log.debug("favoriteNews >>>>>>>>>>>>> ", favoriteNews);
    const favoriteNewsTagList = yield NewsService_1.default.searchTagsByNewsIds(favoriteNews);
    const returnWrappedCollectionOfFavoriteNews = new types_1.NewsReturnDTOCollection(favoriteNews, favoriteNewsTagList).toNewsReturnDTOList();
    return {
        kakaoId: kakaoId,
        favoriteNews: returnWrappedCollectionOfFavoriteNews,
    };
});
exports.getAllFavoriteNewsList = getAllFavoriteNewsList;
const updateExistingUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userQueryRepository = yield getConnectionToUserQueryRepository();
    const userCommandRepository = yield getConnectionToUserCommandRepository();
    try {
        yield userQueryRepository.findByKakaoId(user.kakaoId);
    }
    catch (_a) {
        throw new UserNotFoundError_1.default();
    }
    const returnUser = yield userCommandRepository.registerOrSaveUser(user);
    const returnUserFavoriteNews = yield returnUser.favoriteNews;
    const returnUserInfo = new types_1.UserInfo(returnUser);
    returnUserInfo.addFavoriteNewsAfterPromiseResolved(returnUserFavoriteNews);
    return returnUserInfo;
});
exports.updateExistingUser = updateExistingUser;
const addNewFavoriteNews = (accessToken, kakaoId, newsId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, exports.doesAccessTokenExpire)(accessToken, kakaoId)) {
        throw new AccessTokenExpiredError_1.default();
    }
    const userQueryRepository = yield getConnectionToUserQueryRepository();
    const pendingFavoriteNews = yield NewsService_1.default.searchByNewsId(newsId);
    log.debug(pendingFavoriteNews, pendingFavoriteNews);
    const toBeUpdatedUser = yield userQueryRepository.findByKakaoIdActiveRecordManner(kakaoId);
    log.debug(toBeUpdatedUser);
    yield toBeUpdatedUser.addFavoriteNews(pendingFavoriteNews);
    const userCommandRepository = yield getConnectionToUserCommandRepository();
    yield userCommandRepository.registerOrSaveUser(toBeUpdatedUser);
    const favoriteNews = yield toBeUpdatedUser.getFavoriteNews();
    const favoriteNewsTagList = yield NewsService_1.default.searchTagsByNewsIds(favoriteNews);
    return new types_1.NewsReturnDTOCollection(favoriteNews, favoriteNewsTagList).toNewsReturnDTOList();
});
exports.addNewFavoriteNews = addNewFavoriteNews;
const removeFavoriteNews = (kakaoId, newsId) => __awaiter(void 0, void 0, void 0, function* () {
    const userQueryRepository = yield getConnectionToUserQueryRepository();
    const toBeforeUpdatedUser = yield userQueryRepository.findByKakaoIdActiveRecordManner(kakaoId);
    const pendingRemovedNews = yield NewsService_1.default.searchByNewsId(newsId);
    const toAfterUpdatedUser = yield toBeforeUpdatedUser.removeFavoriteNews(pendingRemovedNews);
    return yield (0, exports.updateExistingUser)(toAfterUpdatedUser);
});
exports.removeFavoriteNews = removeFavoriteNews;
const searchByKakaoId = (kakaoId) => __awaiter(void 0, void 0, void 0, function* () {
    const userQueryRepository = yield getConnectionToUserQueryRepository();
    try {
        return yield userQueryRepository.findByKakaoId(kakaoId);
    }
    catch (_b) {
        log.debug('meow');
        // TODO: need an another handler for this error
        throw new CustomError_1.default(404, 'User Not Found');
    }
});
exports.default = {
    loginUserWithKakao: exports.loginUserWithKakao,
    signUpUserWithKakao: exports.signUpUserWithKakao,
    logOutUserWithKakao: exports.logOutUserWithKakao,
    findUserByEmail: exports.findUserByEmail,
    getKakaoRawInfo: exports.getKakaoRawInfo,
    doesAccessTokenExpire: exports.doesAccessTokenExpire,
    // updateTokensAtRedisWithUserIdWithWrappedDTO,
    checkAccessTokenExpiryTTLToRedisServer: exports.checkAccessTokenExpiryTTLToRedisServer,
    saveTokensAtRedisWithUserId: exports.saveTokensAtRedisWithUserId,
    // updateAccessTokenByRefreshToken,
    getAllFavoriteNewsList: exports.getAllFavoriteNewsList,
    addNewFavoriteNews: exports.addNewFavoriteNews,
    removeFavoriteNews: exports.removeFavoriteNews,
    findUserByKakaoId: exports.findUserByKakaoId,
    searchByUserId: searchByKakaoId,
    updateExistingUser: exports.updateExistingUser,
    getAccessTokenAndUserIdByCode: exports.getAccessTokenAndUserIdByCode,
    getAccessTokenByCode: exports.getAccessTokenByCode,
};
//# sourceMappingURL=UserService.js.map