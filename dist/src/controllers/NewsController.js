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
const NewsService_1 = __importDefault(require("../service/NewsService"));
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const util_1 = __importDefault(require("../modules/util"));
const types_1 = require("../types");
const utils_1 = require("../shared/common/utils");
/**
 * @route get /search
 * @description Search for news based on conditions
 * @access Public
 */
const searchNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channels = req.body.channels;
    const categories = req.body.categories;
    const announcerGender = req.body.announcerGender;
    const currentPage = req.body.currentPage;
    const listSize = req.body.listSize;
    const searchCondition = new types_1.SearchCondition(channels, categories, announcerGender, currentPage, listSize);
    let conditionList = (0, utils_1.validateConditions)(searchCondition);
    console.log(conditionList);
    let data;
    let paginationInfo;
    try {
        if (conditionList) {
            [data, paginationInfo] = yield NewsService_1.default.searchByConditions(conditionList, searchCondition);
        }
        else {
            [data, paginationInfo] = yield NewsService_1.default.searchAllNews();
        }
        res
            .status(statusCode_1.default.OK)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.SEARCH_NEWS_SUCCESS, data, paginationInfo));
    }
    catch (error) {
        console.log(error);
        if (error.message === responseMessage_1.default.EXCEED_PAGE_INDEX) {
            res
                .status(statusCode_1.default.NOT_FOUND)
                .send(util_1.default.fail(statusCode_1.default.NOT_FOUND, responseMessage_1.default.EXCEED_PAGE_INDEX));
        }
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
/**
 * @route post / recommend
 * @description Find news recommended by PM
 * @access Public
 */
const recommendNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    try {
        data = yield NewsService_1.default.searchRecommendNews();
        res
            .status(statusCode_1.default.OK)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.RECOMMEND_NEWS_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const newsDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newsId = Number(req.params.newsId);
    let data;
    try {
        data = yield NewsService_1.default.findNewsDetail(newsId);
        res
            .status(statusCode_1.default.OK)
            .send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.DETAIL_NEWS_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.default = {
    searchNews,
    recommendNews,
    newsDetail,
};
//# sourceMappingURL=NewsController.js.map