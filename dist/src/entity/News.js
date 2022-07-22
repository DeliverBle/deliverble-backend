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
Object.defineProperty(exports, "__esModule", { value: true });
exports.News = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("../shared/common/Category");
const Gender_1 = require("../shared/common/Gender");
const Time_1 = require("../vo/Time");
const Suitability_1 = require("../shared/common/Suitability");
const Tag_1 = require("./Tag");
const Channel_1 = require("../shared/common/Channel");
const Script_1 = require("./Script");
const class_validator_1 = require("class-validator");
let News = class News extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], News.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], News.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        name: 'category',
        enum: Category_1.Category,
        default: Category_1.Category.UNSPECIFIED,
    }),
    __metadata("design:type", String)
], News.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Tag_1.Tag, (tag) => tag.news, {
        cascade: true,
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Array)
], News.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Script_1.Script, (script) => script.news, {
        cascade: true,
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Array)
], News.prototype, "scripts", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        name: 'announcer_gender',
        enum: Gender_1.Gender,
        default: Gender_1.Gender.UNSPECIFIED,
    }),
    __metadata("design:type", String)
], News.prototype, "announcerGender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        name: 'channel',
        enum: Channel_1.Channel,
        default: Channel_1.Channel.UNSPECIFIED,
    }),
    __metadata("design:type", String)
], News.prototype, "channel", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 1000 }),
    __metadata("design:type", String)
], News.prototype, "link", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 1000 }),
    __metadata("design:type", String)
], News.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Time_1.Time),
    __metadata("design:type", Time_1.Time)
], News.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Time_1.Time),
    __metadata("design:type", Time_1.Time)
], News.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        name: 'suitability',
        enum: Suitability_1.Suitability,
        default: Suitability_1.Suitability.MEDIUM,
    }),
    __metadata("design:type", String)
], News.prototype, "suitability", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", Boolean)
], News.prototype, "isEmbeddable", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], News.prototype, "reportDate", void 0);
News = __decorate([
    (0, typeorm_1.Entity)()
], News);
exports.News = News;
//# sourceMappingURL=News.js.map