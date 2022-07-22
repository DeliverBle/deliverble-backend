"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const tslog_1 = require("tslog");
const typeorm_1 = require("typeorm");
const AccessTokenExpiredError_1 = __importDefault(require("../error/AccessTokenExpiredError"));
const CustomError_1 = __importDefault(require("../error/CustomError"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const SpacingCommandRepository_1 = require("../repository/SpacingCommandRepository");
const SpacingQueryRepository_1 = require("../repository/SpacingQueryRepository");
const types_1 = require("../types");
const NewsService_1 = __importDefault(require("./NewsService"));
const UserService_1 = __importStar(require("./UserService"));
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
const getConnectionToSpacingQueryRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = (0, typeorm_1.getConnection)();
    return connection.getCustomRepository(SpacingQueryRepository_1.SpacingQueryRepository);
});
const getConnectionToSpacingCommandRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = (0, typeorm_1.getConnection)();
    return connection.getCustomRepository(SpacingCommandRepository_1.SpacingCommandRepository);
});
const getSpacingByKakaoIdAndNewsId = (getSpacing) => __awaiter(void 0, void 0, void 0, function* () {
    const spacingQueryRepository = yield getConnectionToSpacingQueryRepository();
    const accessToken = getSpacing.accessToken;
    const kakaoId = getSpacing.kakaoId;
    const newsId = getSpacing.newsId;
    if (yield (0, UserService_1.doesAccessTokenExpire)(accessToken, kakaoId)) {
        throw new AccessTokenExpiredError_1.default();
    }
    const user = yield UserService_1.default.findUserByKakaoId(kakaoId.toString());
    const userId = user.id;
    const spacingOfAllUserId = yield spacingQueryRepository.findAllSpacingByUserId(userId);
    const scriptIdsOfNewsId = yield NewsService_1.default.findScriptIdsByNewsId(newsId.toString());
    const spacingByKakaoIdAndNewsId = spacingOfAllUserId.filter((spacing) => scriptIdsOfNewsId.includes(spacing.scriptId));
    return new types_1.SpacingReturnCollectionDTO(spacingByKakaoIdAndNewsId.map((spacing) => new types_1.SpacingReturnDTO(spacing)));
});
const createSpacing = (createSpacing) => __awaiter(void 0, void 0, void 0, function* () {
    // const spacingQueryRepository = await getConnectionToSpacingQueryRepository();
    const accessToken = createSpacing.accessToken;
    const kakaoId = createSpacing.kakaoId;
    const newsId = createSpacing.newsId;
    if (yield (0, UserService_1.doesAccessTokenExpire)(accessToken, kakaoId)) {
        throw new AccessTokenExpiredError_1.default();
    }
    const spacingCommandRepository = yield getConnectionToSpacingCommandRepository();
    const user = yield UserService_1.default.searchByUserId(kakaoId);
    const spacing = createSpacing.toEntity(user);
    try {
        // save highlight
        const savedSpacing = yield spacingCommandRepository.saveNewSpacing(spacing);
        log.debug('savedHighlight ', savedSpacing);
        const getSpacing = new types_1.GetSpacing(accessToken, kakaoId, newsId);
        return yield getSpacingByKakaoIdAndNewsId(getSpacing);
    }
    catch (error) {
        log.error('error', error);
        // TODO: make new custom error
        throw new CustomError_1.default(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR);
    }
});
const getSpacing = (getSpacing) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = getSpacing.accessToken;
    const kakaoId = getSpacing.kakaoId;
    const newsId = getSpacing.newsId;
    if (yield (0, UserService_1.doesAccessTokenExpire)(accessToken, kakaoId)) {
        throw new AccessTokenExpiredError_1.default();
    }
    return yield getSpacingByKakaoIdAndNewsId(getSpacing);
});
const removeSpacing = (removeSpacing) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = removeSpacing.accessToken;
    const kakaoId = removeSpacing.kakaoId;
    const newsId = removeSpacing.newsId;
    const spacingId = removeSpacing.spacingId;
    if (yield (0, UserService_1.doesAccessTokenExpire)(accessToken, kakaoId)) {
        throw new AccessTokenExpiredError_1.default();
    }
    const spacingCommandRepository = yield getConnectionToSpacingCommandRepository();
    const user = yield UserService_1.default.searchByUserId(kakaoId);
    // const spacing = createSpacing.toEntity(user);
    try {
        // save highlight
        const removedSpacing = yield spacingCommandRepository.removeSpacingBySpacingId(spacingId);
        log.debug('removedSpacing ', removedSpacing);
        if (removedSpacing === false) {
            throw new CustomError_1.default(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.NOT_FOUND_SPACING);
        }
        const getSpacing = new types_1.GetSpacing(accessToken, kakaoId, newsId);
        return yield getSpacingByKakaoIdAndNewsId(getSpacing);
    }
    catch (error) {
        log.error('error', error);
        // TODO: make new custom error
        if (error === undefined) {
            throw new CustomError_1.default(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR);
        }
        throw error;
    }
});
exports.default = {
    createSpacing,
    getSpacing,
    removeSpacing,
};
//# sourceMappingURL=SpacingService.js.map