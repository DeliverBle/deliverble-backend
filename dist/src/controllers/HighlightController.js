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
exports.updateExistingMemoOfHighlight = exports.removeExistingMemoOfHighlight = exports.addNewMemoOfHighlight = exports.removeHighlightByKakaoIdAndHighlightId = exports.getHighlightByKakaoIdAndNewsId = exports.createHighlight = void 0;
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const UserController_1 = __importDefault(require("./UserController"));
const tslog_1 = require("tslog");
const types_1 = require("../types");
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const HighlightService_1 = __importDefault(require("../service/HighlightService"));
const util_1 = __importDefault(require("../modules/util"));
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
const createHighlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokensAndUserId = yield UserController_1.default.getTokensParsedFromBody(req.body);
    const accessToken = tokensAndUserId.accessToken;
    let kakaoId = tokensAndUserId.userId;
    kakaoId = kakaoId.replace(/['"]+/g, '');
    const scriptId = req.body.script_id;
    const startingIndex = req.body.starting_index;
    const endingIndex = req.body.ending_index;
    const createHighlight = new types_1.CreateHighlight(accessToken, kakaoId, scriptId, startingIndex, endingIndex);
    try {
        const highlightReturnCollection = (yield HighlightService_1.default.createHighlight(createHighlight))
            .highlightReturnCollection;
        const data = {
            highlightReturnCollection
        };
        res
            .status(statusCode_1.default.CREATED)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.CREATE_HIGHLIGHT_SUCCESS, data));
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
exports.createHighlight = createHighlight;
const getHighlightByKakaoIdAndNewsId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const accessToken = req.body['access_token'];
    // let kakaoId = req.body['user_id'];
    // kakaoId = kakaoId.replace(/['"]+/g, '');
    // const newsId = req.body['news_id'];
    // const accessToken = req.header("access_token");
    // const accessToken = req.headers["access_token"].toString();
    // // const kakaoId = req.header("user_id").replace(/['"]+/g, '');
    // let kakaoId = req.headers["user_id"].toString().replace(/['"]+/g, '');
    // const newsId: number = Number(req.query.news_id);
    // log.debug('hello', kakaoId, newsId);
    try {
        const newsId = Number(req.query.news_id);
        const authorization = req.headers["authorization"].toString().split(" ");
        log.debug("authorization", authorization);
        const accessToken = authorization[0];
        log.debug('req.headers["access_token"]', accessToken);
        // @ts-ignore
        let kakaoId = authorization[1].replace(/['"]+/g, '');
        log.debug('type of accessToken', typeof accessToken);
        log.debug('type of kakaoId', typeof kakaoId);
        const highlightReturnCollection = (yield HighlightService_1.default.getHighlightByKakaoIdAndNewsId(accessToken, kakaoId, newsId)).highlightReturnCollection;
        const data = {
            highlightReturnCollection
        };
        return res
            .status(statusCode_1.default.OK)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.GET_HIGHLIGHT_SUCCESS, data));
    }
    catch (err) {
        log.error(err);
        if (err.response !== undefined) {
            return res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send({
                status: statusCode_1.default.BAD_REQUEST,
                message: {
                    refresh: 'fail',
                    message: responseMessage_1.default.BAD_REQUEST,
                },
            });
        }
        return res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send({
            status: statusCode_1.default.BAD_REQUEST,
            message: {
                refresh: 'fail',
                message: responseMessage_1.default.BAD_REQUEST,
            },
        });
    }
});
exports.getHighlightByKakaoIdAndNewsId = getHighlightByKakaoIdAndNewsId;
const removeHighlightByKakaoIdAndHighlightId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body['access_token'];
    let kakaoId = req.body['user_id'];
    kakaoId = kakaoId.replace(/['"]+/g, '');
    const highlightId = req.body['highlight_id'];
    log.debug('hello', kakaoId, highlightId);
    try {
        const data = yield HighlightService_1.default.removeHighlightByHighlightId(accessToken, kakaoId, highlightId);
        res
            .status(statusCode_1.default.OK)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.REMOVE_HIGHLIGHT_SUCCESS, data));
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
exports.removeHighlightByKakaoIdAndHighlightId = removeHighlightByKakaoIdAndHighlightId;
const addNewMemoOfHighlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body['access_token'];
    let kakaoId = req.body['user_id'];
    kakaoId = kakaoId.replace(/['"]+/g, '');
    const highlightId = req.body['highlight_id'];
    const keyword = req.body['keyword'];
    const content = req.body['content'];
    log.debug('hello', kakaoId, highlightId, keyword, content);
    try {
        const data = (yield HighlightService_1.default.addMemoOfHighlight(new types_1.AddMemoDTO(accessToken, kakaoId, highlightId, keyword, content)));
        res.status(statusCode_1.default.OK).send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.ADD_MEMO_SUCCESS, data));
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
exports.addNewMemoOfHighlight = addNewMemoOfHighlight;
const removeExistingMemoOfHighlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body['access_token'];
    let kakaoId = req.body['user_id'];
    kakaoId = kakaoId.replace(/['"]+/g, '');
    const highlightId = req.body['highlight_id'];
    log.debug('removeExistingMemoOfHighlight >>>>>>>>>>>>> ', kakaoId, highlightId);
    try {
        const data = (yield HighlightService_1.default.removeExistingMemoOfHighlight(new types_1.RemoveExistingMemoDTO(accessToken, kakaoId, highlightId)));
        res.status(statusCode_1.default.OK).send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.REMOVE_MEMO_SUCCESS, data));
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
exports.removeExistingMemoOfHighlight = removeExistingMemoOfHighlight;
const updateExistingMemoOfHighlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.body['access_token'];
    let kakaoId = req.body['user_id'];
    kakaoId = kakaoId.replace(/['"]+/g, '');
    const highlightId = req.body['highlight_id'];
    const keyword = req.body['keyword'];
    const content = req.body['content'];
    log.debug('updateMemoOfHighlight >>>>>>>>>>>>> ', kakaoId, highlightId, keyword, content);
    try {
        const data = (yield HighlightService_1.default.updateMemoOfHighlight(new types_1.UpdateExistingMemoDTO(accessToken, kakaoId, highlightId, keyword, content)));
        res.status(statusCode_1.default.OK).send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.UPDATE_MEMO_SUCCESS, data));
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
exports.updateExistingMemoOfHighlight = updateExistingMemoOfHighlight;
exports.default = {
    createHighlight: exports.createHighlight,
    getHighlightByKakaoIdAndNewsId: exports.getHighlightByKakaoIdAndNewsId,
    removeHighlightByKakaoIdAndHighlightId: exports.removeHighlightByKakaoIdAndHighlightId,
    addNewMemoOfHighlight: exports.addNewMemoOfHighlight,
    removeExistingMemoOfHighlight: exports.removeExistingMemoOfHighlight,
    updateExistingMemoOfHighlight: exports.updateExistingMemoOfHighlight,
};
//# sourceMappingURL=HighlightController.js.map