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
exports.removeSpacing = exports.getSpacing = exports.createSpacing = void 0;
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const UserController_1 = __importDefault(require("./UserController"));
const tslog_1 = require("tslog");
const types_1 = require("../types");
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const SpacingService_1 = __importDefault(require("../service/SpacingService"));
const util_1 = __importDefault(require("../modules/util"));
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
const createSpacing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    log.debug('req.query', req.query);
    const tokensAndUserId = yield UserController_1.default.getTokensParsedFromBody(req.body);
    const accessToken = tokensAndUserId.accessToken;
    let kakaoId = tokensAndUserId.userId;
    kakaoId = kakaoId.replace(/['"]+/g, '');
    const newsId = req.body.news_id;
    const scriptId = req.body.script_id;
    const index = req.body.index;
    const createSpacing = new types_1.CreateSpacing(accessToken, kakaoId, scriptId, newsId, index);
    try {
        const data = yield SpacingService_1.default.createSpacing(createSpacing);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.CREATE_SPACING_SUCCESS, data));
    }
    catch (err) {
        log.error(err);
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
exports.createSpacing = createSpacing;
const getSpacing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const tokensAndUserId = await UserController.getTokensParsedFromBody(req.body);
    // const accessToken = tokensAndUserId.accessToken;
    // let kakaoId = tokensAndUserId.userId;
    // kakaoId = kakaoId.replace(/['"]+/g, '');
    // const accessToken = req.header("access_token");
    // const kakaoId = req.header("user_id");
    // const newsId: number = Number(req.query.news_id);
    const newsId = Number(req.query.news_id);
    const authorization = req.headers["authorization"].toString().split(" ");
    log.debug("authorization", authorization);
    const accessToken = authorization[0];
    log.debug('req.headers["access_token"]', accessToken);
    // @ts-ignore
    let kakaoId = authorization[1].replace(/['"]+/g, '');
    const getSpacing = new types_1.GetSpacing(accessToken, kakaoId, newsId);
    try {
        const data = yield SpacingService_1.default.getSpacing(getSpacing);
        res
            .status(statusCode_1.default.OK)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.GET_SPACING_SUCCESS, data));
    }
    catch (err) {
        log.error(err);
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
exports.getSpacing = getSpacing;
const removeSpacing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    log.debug('req.query', req.query);
    const tokensAndUserId = yield UserController_1.default.getTokensParsedFromBody(req.body);
    const accessToken = tokensAndUserId.accessToken;
    let kakaoId = tokensAndUserId.userId;
    kakaoId = kakaoId.replace(/['"]+/g, '');
    const newsId = req.body.news_id;
    const spacingId = req.body.spacing_id;
    const removeSpacing = new types_1.RemoveSpacing(accessToken, kakaoId, newsId, spacingId);
    try {
        const data = yield SpacingService_1.default.removeSpacing(removeSpacing);
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.REMOVE_SPACING_SUCCESS, data));
    }
    catch (err) {
        log.error(err);
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
exports.removeSpacing = removeSpacing;
exports.default = {
    createSpacing: exports.createSpacing,
    getSpacing: exports.getSpacing,
    removeSpacing: exports.removeSpacing,
};
//# sourceMappingURL=SpacingController.js.map