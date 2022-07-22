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
exports.Script = void 0;
const typeorm_1 = require("typeorm");
const Time_1 = require("../vo/Time");
const News_1 = require("./News");
const defaultTime = new Time_1.Time(0, 0);
let Script = class Script extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Script.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => News_1.News, {
        onDelete: "CASCADE",
        eager: true
    }),
    (0, typeorm_1.JoinColumn)({ name: 'news_id', referencedColumnName: 'id' }),
    __metadata("design:type", News_1.News)
], Script.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'news_id' }),
    __metadata("design:type", Number)
], Script.prototype, "newsId", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Time_1.Time),
    __metadata("design:type", Time_1.Time)
], Script.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Time_1.Time),
    __metadata("design:type", Time_1.Time)
], Script.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '',
    }),
    __metadata("design:type", String)
], Script.prototype, "text", void 0);
Script = __decorate([
    (0, typeorm_1.Entity)()
], Script);
exports.Script = Script;
//# sourceMappingURL=Script.js.map