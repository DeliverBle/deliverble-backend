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
exports.findScriptIdsByNewsId = void 0;
const typeorm_1 = require("typeorm");
const NewsRepository_1 = require("../repository/NewsRepository");
const utils_1 = require("../shared/common/utils");
const types_1 = require("../types");
const tslog_1 = require("tslog");
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const CustomError_1 = __importDefault(require("../error/CustomError"));
const pagination_1 = require("../util/pagination");
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
const getConnectionToMySql = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = (0, typeorm_1.getConnection)();
    return connection.getCustomRepository(NewsRepository_1.NewsQueryRepository);
});
const searchTagsByNewsIds = (newsList) => __awaiter(void 0, void 0, void 0, function* () {
    const newsRepository = yield getConnectionToMySql();
    let newsIdList = newsList.map((news) => news.id);
    // TODO: 추후 Active Record 사용 하지 말 것
    let newsData = yield newsRepository.findByIds(newsIdList, {
        relations: ['tags'],
    });
    let tagDataOfEachNews = newsData.map((news) => news.tags);
    const tagDataOfEachNewsMappedList = tagDataOfEachNews.map((acc, cur, idx) => {
        return new types_1.TagOfEachNewsReturnDto(acc);
    }, []);
    return new types_1.TagOfNewsReturnDtoCollection(tagDataOfEachNewsMappedList);
});
const searchAllNews = () => __awaiter(void 0, void 0, void 0, function* () {
    const newsRepository = yield getConnectionToMySql();
    let newsData = yield newsRepository.find();
    let totalCount = newsData.length;
    let lastPage = (0, pagination_1.getLastPage)(12, totalCount);
    let paginationInfo = new types_1.PaginationInfo(totalCount, lastPage);
    return [newsData, paginationInfo];
});
const searchByChannel = (searchCondition) => __awaiter(void 0, void 0, void 0, function* () {
    const newsRepository = yield getConnectionToMySql();
    return yield newsRepository.findByChannels(searchCondition);
});
const searchByCategory = (searchCondition) => __awaiter(void 0, void 0, void 0, function* () {
    const newsRepository = yield getConnectionToMySql();
    return yield newsRepository.findByCategories(searchCondition.categories);
});
const searchByGender = (searchCondition) => __awaiter(void 0, void 0, void 0, function* () {
    const newsRepository = yield getConnectionToMySql();
    try {
        return yield newsRepository.findByAnnouncerGender(searchCondition.announcerGender);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const fetchByChannel = (conditionList, searchCondition) => __awaiter(void 0, void 0, void 0, function* () {
    const newsRepository = yield getConnectionToMySql();
    if ((0, types_1.hasFindAll)(conditionList) || searchCondition.channels.length === 0) {
        return yield newsRepository.findAllNews(searchCondition);
    }
    if ((0, types_1.hasChannels)(conditionList)) {
        return yield newsRepository.findByChannels(searchCondition);
    }
    return yield newsRepository.findAllNews(searchCondition);
});
const filterNewsDataByCategory = (newsData, searchCondition) => {
    if (searchCondition.categories.length === 0) {
        return newsData;
    }
    const filteredNewsData = newsData.filter((news) => {
        if (searchCondition.categories.includes(news.category)) {
            console.log(news);
            return news;
        }
    });
    // TODO: wrapping newsData with first collection so that avoiding any mistakes
    return filteredNewsData;
};
const filterNewsDataByAnnouncerGender = (newsData, searchCondition) => {
    if (searchCondition.announcerGender.length == 0) {
        return newsData;
    }
    const filteredNewsData = newsData.filter((news) => {
        if (searchCondition.announcerGender.includes(news.announcerGender)) {
            return news;
        }
    });
    // TODO: wrapping newsData with first collection so that avoiding any mistakes
    return filteredNewsData;
};
const validateNewsDataLength = (offset, newsData) => {
    if (offset > newsData.length) {
        throw new Error(responseMessage_1.default.EXCEED_PAGE_INDEX);
    }
};
const paginateWithOffsetAndLimit = (searchCondition, newsData) => {
    const offset = searchCondition.getOffset();
    const limit = searchCondition.getLimit();
    const endIndex = offset + limit;
    validateNewsDataLength(offset, newsData);
    return newsData.slice(offset, endIndex);
};
const searchByConditions = (conditionList, searchCondition) => __awaiter(void 0, void 0, void 0, function* () {
    let newsData = yield fetchByChannel(conditionList, searchCondition);
    if ((0, types_1.hasCategories)(conditionList)) {
        const filteredNewsData = yield filterNewsDataByCategory(newsData, searchCondition);
        newsData = filteredNewsData;
    }
    if ((0, types_1.hasAnnouncerGender)(conditionList)) {
        const filteredNewsData = yield filterNewsDataByAnnouncerGender(newsData, searchCondition);
        // TODO: wrapping newsData with first collection so that avoiding any mistakes
        newsData = filteredNewsData;
    }
    // pagination offset, listsize에 맞게 슬라이싱하기 전 totalCount, lastPage를 구함
    let totalCount = newsData.length;
    let lastPage = (0, pagination_1.getLastPage)(12, totalCount);
    let paginationInfo = new types_1.PaginationInfo(totalCount, lastPage);
    // TODO: wrapping newsData with first collection so that avoiding any mistakes
    newsData = (0, utils_1.sortByDateAndTitle)([newsData]);
    newsData = paginateWithOffsetAndLimit(searchCondition, newsData);
    let newsDataReturn = [];
    for (let i in newsData) {
        let news = new types_1.NewsReturnDTO(newsData[i]);
        newsDataReturn.push(news);
    }
    return [newsDataReturn, paginationInfo];
});
const searchRecommendNews = () => __awaiter(void 0, void 0, void 0, function* () {
    const recommendCount = 8;
    const newsRepository = yield getConnectionToMySql();
    let newsData = yield newsRepository.findRecommendNews();
    let newsDataReturn = [];
    for (let i in newsData) {
        let news = new types_1.NewsReturnDTO(newsData[i]);
        newsDataReturn.push(news);
    }
    newsDataReturn = (0, utils_1.sortByDateAndTitle)([newsDataReturn]);
    return newsDataReturn.slice(0, recommendCount);
});
const findNewsDetail = (newsId) => __awaiter(void 0, void 0, void 0, function* () {
    const newsRepository = yield getConnectionToMySql();
    let newsData = yield newsRepository.findNewsDetail(newsId);
    let newsScriptData = new types_1.NewsScriptReturnDTO(newsData);
    newsScriptData['scripts'] = newsData['scripts'];
    // console.log( newsScriptData['scripts']);
    let scriptList = [];
    for (let i in newsData['scripts']) {
        console.log(newsData['scripts'][i]);
        let script = new types_1.ScriptReturnDto(newsData['scripts'][i]);
        scriptList.push(script);
    }
    newsScriptData['scripts'] = scriptList;
    return newsScriptData;
});
const searchByNewsId = (newsId) => __awaiter(void 0, void 0, void 0, function* () {
    const newsRepository = yield getConnectionToMySql();
    try {
        return yield newsRepository.findByNewsId(newsId);
    }
    catch (_a) {
        log.debug('meow');
        // TODO: need an another handler for this error
        throw new CustomError_1.default(404, 'News Not Found');
    }
});
const findScriptIdsByNewsId = (newsId) => __awaiter(void 0, void 0, void 0, function* () {
    const newsDetailDTO = yield findNewsDetail(Number(newsId));
    return newsDetailDTO.scripts.map((script) => script.id);
});
exports.findScriptIdsByNewsId = findScriptIdsByNewsId;
exports.default = {
    searchAllNews,
    searchByCategory,
    searchByChannel,
    searchByGender,
    searchByConditions,
    searchRecommendNews,
    findNewsDetail,
    searchByNewsId,
    findScriptIdsByNewsId: exports.findScriptIdsByNewsId,
    searchTagsByNewsIds,
};
//# sourceMappingURL=NewsService.js.map