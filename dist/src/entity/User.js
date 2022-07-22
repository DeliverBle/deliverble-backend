"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Gender_1 = require("../shared/common/Gender");
const News_1 = require("./News");
const tslog_1 = require("tslog");
const class_validator_1 = require("class-validator");
const Highlight_1 = require("./Highlight");
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
let User = User_1 = class User extends typeorm_1.BaseEntity {
    constructor(_kakaoId, _nickname, _email, _gender) {
        super();
        this.addFavoriteNews = (news) => __awaiter(this, void 0, void 0, function* () {
            const favoriteNewsList = yield this.favoriteNews;
            favoriteNewsList.push(news);
            log.debug(favoriteNewsList);
            return this;
        });
        this.removeFavoriteNews = (toBeDeletedNews) => __awaiter(this, void 0, void 0, function* () {
            const favoriteNewsList = yield this.favoriteNews;
            this.favoriteNews = Promise.resolve(favoriteNewsList.filter((nowIteratedNews) => {
                return nowIteratedNews.id !== toBeDeletedNews.id;
            }));
            return this;
        });
        this.addNewHighlight = (highlight) => __awaiter(this, void 0, void 0, function* () {
            const highlights = yield this.highlights;
            highlights.push(highlight);
            return this;
        });
        this.removeExistingHighlight = (toBeDeletedHighlight) => __awaiter(this, void 0, void 0, function* () {
            const highlights = yield this.highlights;
            this.highlights = Promise.resolve(highlights.filter((highlight) => {
                return highlight.id !== toBeDeletedHighlight.id;
            }));
            return this;
        });
        this.getFavoriteNews = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.favoriteNews;
        });
        this.kakaoId = _kakaoId;
        this.nickname = _nickname;
        this.email = _email;
        this.gender = (0, Gender_1.determineGenderByGivenString)(_gender);
    }
    nullChecks() {
        return __awaiter(this, void 0, void 0, function* () {
            const NO_EMAIL = 'NO_EMAIL';
            if (!this.email) {
                log.info('User denied to provide email information');
                this.email = NO_EMAIL;
            }
            if (!this.gender) {
                this.gender = Gender_1.Gender.UNSPECIFIED;
            }
        });
    }
    static fromKakaoRawInfo(kakaoRawInfo) {
        return new User_1(kakaoRawInfo.kakaoId, kakaoRawInfo.nickname, kakaoRawInfo.email, kakaoRawInfo.gender);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "kakaoId", void 0);
__decorate([
    (0, class_validator_1.Length)(10, 20),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, typeorm_1.Column)({
        unique: true,
        default: "NO_EMAIL"
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Gender_1.Gender,
        default: Gender_1.Gender.UNSPECIFIED,
    }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => News_1.News, { eager: false }),
    (0, typeorm_1.JoinTable)({
        name: 'user_favorite_news',
        joinColumn: {
            name: 'user',
            referencedColumnName: 'kakaoId',
        },
        inverseJoinColumn: {
            name: 'news',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Promise)
], User.prototype, "favoriteNews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Highlight_1.Highlight, (highlight) => highlight.user, { eager: false }),
    __metadata("design:type", Promise)
], User.prototype, "highlights", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "nullChecks", null);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, String, String, String])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map