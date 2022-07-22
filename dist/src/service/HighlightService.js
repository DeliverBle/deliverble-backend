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
const typeorm_1 = require("typeorm");
const tslog_1 = require("tslog");
const types_1 = require("../types");
const HighlightRepository_1 = require("../repository/HighlightRepository");
const UserService_1 = __importStar(require("./UserService"));
const HighlightCommandRepository_1 = require("../repository/HighlightCommandRepository");
const CustomError_1 = __importDefault(require("../error/CustomError"));
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const NewsService_1 = __importDefault(require("./NewsService"));
const ScriptQueryRepository_1 = require("../repository/ScriptQueryRepository");
const DuplicateStartingIndexAndEndingIndex_1 = __importDefault(require("../error/DuplicateStartingIndexAndEndingIndex"));
const AccessTokenExpiredError_1 = __importDefault(require("../error/AccessTokenExpiredError"));
const ResourceNotFoundError_1 = __importDefault(require("../error/ResourceNotFoundError"));
const MemoRepository_1 = require("../repository/MemoRepository");
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
const getConnectionToHighlightQueryRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = (0, typeorm_1.getConnection)();
    return connection.getCustomRepository(HighlightRepository_1.HighlightQueryRepository);
});
const getConnectionToHighlightCommandRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = (0, typeorm_1.getConnection)();
    return connection.getCustomRepository(HighlightCommandRepository_1.HighlightCommandRepository);
});
const getConnectionToMemoQueryRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = (0, typeorm_1.getConnection)();
    return connection.getCustomRepository(MemoRepository_1.MemoQueryRepository);
});
const getConnectionToMemoCommandRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = (0, typeorm_1.getConnection)();
    return connection.getCustomRepository(MemoRepository_1.MemoCommandRepository);
});
const getConnectionToScriptQueryRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = (0, typeorm_1.getConnection)();
    return connection.getCustomRepository(ScriptQueryRepository_1.ScriptQueryRepository);
});
const getHighlightByKakaoIdAndNewsId = (accessToken, kakaoId, newsId) => __awaiter(void 0, void 0, void 0, function* () {
    log.debug("kakaoId in getHighlight, ", kakaoId);
    const highlightQueryRepository = yield getConnectionToHighlightQueryRepository();
    log.debug('accessToken', accessToken);
    if (yield (0, UserService_1.doesAccessTokenExpire)(accessToken, kakaoId)) {
        throw new AccessTokenExpiredError_1.default();
    }
    try {
        const user = yield UserService_1.default.findUserByKakaoId(kakaoId.toString());
        log.debug('user >>> ', user);
        const userId = user.id;
        log.debug('userId', userId);
        const highlightOfAllUserId = yield highlightQueryRepository.findAllHighlightByUserId(userId);
        const scriptIdsOfNewsId = yield NewsService_1.default.findScriptIdsByNewsId(newsId.toString());
        const returnHighlights = highlightOfAllUserId.filter((highlight) => scriptIdsOfNewsId.includes(highlight.scriptId));
        const highlightReturnDTOArray = returnHighlights.map((highlight) => __awaiter(void 0, void 0, void 0, function* () { return yield types_1.HighlightReturnDTO.createHighlightReturnDTOWithMemo(highlight); }));
        return types_1.HighlightReturnCollectionDTO.createCollection(yield Promise.all(highlightReturnDTOArray));
    }
    catch (error) {
        throw new ResourceNotFoundError_1.default();
    }
});
const findNewsIdOfScriptId = (scriptId) => __awaiter(void 0, void 0, void 0, function* () {
    const scriptQueryRepository = yield getConnectionToScriptQueryRepository();
    return yield scriptQueryRepository.findNewsIdOfScriptId(scriptId);
});
const createHighlight = (createHighlight) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = createHighlight.accessToken;
    const kakaoId = createHighlight.kakaoId;
    const scriptId = createHighlight.scriptId;
    if (yield (0, UserService_1.doesAccessTokenExpire)(accessToken, kakaoId)) {
        throw new AccessTokenExpiredError_1.default();
    }
    const highlightCommandRepository = yield getConnectionToHighlightCommandRepository();
    const user = yield UserService_1.default.searchByUserId(kakaoId);
    const highlight = createHighlight.toEntity(user);
    log.debug(' createHighlight.scriptId ', scriptId);
    try {
        // save highlight
        const savedHighlight = yield highlightCommandRepository.saveNewHighlight(highlight);
        log.debug('savedHighlight ', savedHighlight);
        // get newsId of highlight
        const newsId = yield findNewsIdOfScriptId(scriptId);
        return yield getHighlightByKakaoIdAndNewsId(accessToken, kakaoId, newsId);
    }
    catch (error) {
        log.error('error', error);
        if (error.errno === 1062) {
            throw new DuplicateStartingIndexAndEndingIndex_1.default();
        }
        throw new CustomError_1.default(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR);
    }
});
const removeHighlightByHighlightId = (accessToken, kakaoId, highlight_id) => __awaiter(void 0, void 0, void 0, function* () {
    const highlightQueryRepository = yield getConnectionToHighlightQueryRepository();
    const highlightCommandRepository = yield getConnectionToHighlightCommandRepository();
    let toBeDeletedHighlight;
    try {
        toBeDeletedHighlight = yield highlightQueryRepository.findHighlightByHighlightId(highlight_id);
    }
    catch (err) {
        throw new ResourceNotFoundError_1.default();
    }
    const scriptId = toBeDeletedHighlight.scriptId;
    const isHighlightDeleted = yield highlightCommandRepository.removeHighlight(toBeDeletedHighlight);
    if (!isHighlightDeleted) {
        throw new CustomError_1.default(statusCode_1.default.NOT_FOUND, responseMessage_1.default.NOT_FOUND);
    }
    const newsId = yield findNewsIdOfScriptId(scriptId);
    return yield getHighlightByKakaoIdAndNewsId(accessToken, kakaoId, newsId);
});
const addMemoOfHighlight = (addMemoDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const highlightQueryRepository = yield getConnectionToHighlightQueryRepository();
    const highlightCommandRepository = yield getConnectionToHighlightCommandRepository();
    const memoCommandRepository = yield getConnectionToMemoCommandRepository();
    let highlight;
    try {
        log.debug('addMemoDTO.highlightId >>>> ', addMemoDTO.highlightId);
        highlight = yield highlightQueryRepository.findByHighlightByHighlightIdInActiveRecordManner(addMemoDTO.highlightId);
        log.debug(' HIGHLIGHT >>>>>>>>>>>>>>>>>>>>>>>>> ', highlight);
    }
    catch (err) {
        throw new ResourceNotFoundError_1.default();
    }
    const scriptId = highlight.scriptId;
    const memo = addMemoDTO.toEntity();
    const memoSaved = yield memoCommandRepository.registerOrSaveMemo(memo);
    log.debug('memoSaved : >>>>>>>>>>>>> ', memoSaved);
    const addedMemoHighlight = yield highlight.addNewMemo(memo);
    const isHighlightUpdated = yield highlightCommandRepository.registerOrSaveHighlight(addedMemoHighlight);
    log.debug(' HIGHLIGHT UPDATED ', isHighlightUpdated);
    const newsId = yield findNewsIdOfScriptId(scriptId);
    return yield getHighlightByKakaoIdAndNewsId(addMemoDTO.accessToken, addMemoDTO.kakaoId, newsId);
});
const removeExistingMemoOfHighlight = (removeExistingMemoDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const highlightQueryRepository = yield getConnectionToHighlightQueryRepository();
    const highlightCommandRepository = yield getConnectionToHighlightCommandRepository();
    let highlight;
    try {
        highlight = yield highlightQueryRepository.findByHighlightByHighlightIdInActiveRecordManner(removeExistingMemoDTO.highlightId);
    }
    catch (err) {
        throw new ResourceNotFoundError_1.default();
    }
    const scriptId = highlight.scriptId;
    const removedMemoHighlight = yield highlight.removeExistingMemo();
    log.debug(' REMOVED MEMO HIGHLIGHT ', removedMemoHighlight);
    const isHighlightUpdated = yield highlightCommandRepository.updateHighlight(removedMemoHighlight);
    log.debug(' HIGHLIGHT MEMO DELETED ', isHighlightUpdated);
    const newsId = yield findNewsIdOfScriptId(scriptId);
    log.debug('news id !!!!!', newsId);
    return yield getHighlightByKakaoIdAndNewsId(removeExistingMemoDTO.accessToken, removeExistingMemoDTO.kakaoId, newsId);
});
const updateMemoOfHighlight = (updateMemoDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const highlightQueryRepository = yield getConnectionToHighlightQueryRepository();
    const highlightCommandRepository = yield getConnectionToHighlightCommandRepository();
    // TODO: 이렇게 접근하는 것은 DDD 원칙에 위배된다는 것은 알아두자. 어떻게 해야 리팩토링할 수 있을까 추후 고민해보자.
    // TODO: memo_id만 주어졌을 때, highlight DB를 뒤져서 memo_id에 해당하는 highlight_id를 반환해야 한다.
    const memoQueryRepository = yield getConnectionToMemoQueryRepository();
    const memoCommandRepository = yield getConnectionToMemoCommandRepository();
    let toBeUpdatedHighlight;
    try {
        toBeUpdatedHighlight =
            yield highlightQueryRepository.findByHighlightByHighlightIdInActiveRecordManner(updateMemoDTO.highlightId);
    }
    catch (err) {
        log.error('err', err);
        throw new ResourceNotFoundError_1.default();
    }
    let toBeUpdatedMemo;
    try {
        // TODO: how to wrap this?
        toBeUpdatedMemo = (yield toBeUpdatedHighlight.getMemo())[0];
    }
    catch (_a) {
        throw new ResourceNotFoundError_1.default();
    }
    const toUpdateMemo = toBeUpdatedMemo.updateMemo(updateMemoDTO);
    const afterUpdateMemo = yield memoCommandRepository.updateExistingMemo(toUpdateMemo);
    log.debug(' MEMO UPDATED ', afterUpdateMemo);
    toBeUpdatedHighlight = yield toBeUpdatedHighlight.updateExistingMemo(afterUpdateMemo);
    const isHighlightUpdated = yield highlightCommandRepository.updateHighlight(toBeUpdatedHighlight);
    log.debug(' HIGHLIGHT MEMO UPDATED ', isHighlightUpdated);
    const scriptId = toBeUpdatedHighlight.scriptId;
    const newsId = yield findNewsIdOfScriptId(scriptId);
    return yield getHighlightByKakaoIdAndNewsId(updateMemoDTO.accessToken, updateMemoDTO.kakaoId, newsId);
});
exports.default = {
    createHighlight,
    getHighlightByKakaoIdAndNewsId,
    removeHighlightByHighlightId,
    addMemoOfHighlight,
    removeExistingMemoOfHighlight,
    updateMemoOfHighlight,
};
//# sourceMappingURL=HighlightService.js.map