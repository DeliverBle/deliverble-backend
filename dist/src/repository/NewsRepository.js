"use strict";
// src/repository/MotivationRepository/index.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsQueryRepository = void 0;
const typeorm_1 = require("typeorm");
const News_1 = require("../entity/News");
let NewsQueryRepository = class NewsQueryRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        // 모든 News 조회
        this.findAllNews = (searchCondition) => __awaiter(this, void 0, void 0, function* () {
            const totalCount = yield this.createQueryBuilder('news').getCount();
            return yield this.createQueryBuilder('news').getMany();
        });
        // channel이 channels에 속하는 모든 News 조회
        this.findByChannels = (searchCondition) => __awaiter(this, void 0, void 0, function* () {
            const channels = searchCondition.channels;
            return this.createQueryBuilder('news')
                .where('news.channel IN (:...channels)', { channels })
                .getMany();
        });
        // category가 categories에 속하는 모든 News 조회
        this.findByCategories = (categories) => __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('news')
                .where('news.category IN (:...categories)', { categories })
                .getMany();
        });
    }
    // id로 1개의 News 조회
    findById(id) {
        return this.createQueryBuilder('news').where('news.id = :id', { id }).getOne();
    }
    // announcerGender가 일치하는 속하는 모든 News 조회
    findByAnnouncerGender(announcerGender) {
        return this.createQueryBuilder('news')
            .where('news.announcerGender IN (:...announcerGender)', { announcerGender })
            .getMany();
    }
    // 추천 뉴스 조회
    findRecommendNews() {
        return this.createQueryBuilder('news')
            .leftJoinAndSelect('news.tags', 'tags')
            .where('tags.name = :name', { name: '딜리버블 추천' })
            .getMany();
    }
    // newsId가 일치하는 News의 모든 정보 조회
    findNewsDetail(newsId) {
        return this.createQueryBuilder('news')
            .leftJoinAndSelect('news.tags', 'tags')
            .leftJoinAndSelect('news.scripts', 'scripts')
            .where('news.id = :newsId', { newsId })
            .getOne();
    }
    findByNewsId(newsId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('news').where('news.id = :newsId', { newsId }).getOneOrFail();
        });
    }
};
NewsQueryRepository = __decorate([
    (0, typeorm_1.EntityRepository)(News_1.News)
], NewsQueryRepository);
exports.NewsQueryRepository = NewsQueryRepository;
//# sourceMappingURL=NewsRepository.js.map