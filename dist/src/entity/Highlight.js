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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Highlight = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Memo_1 = require("./Memo");
const class_validator_1 = require("class-validator");
let Highlight = class Highlight extends typeorm_1.BaseEntity {
    constructor(_user, _scriptId, _startingIndex, _endingIndex) {
        super();
        this.user = _user;
        this.scriptId = _scriptId;
        this.startingIndex = _startingIndex;
        this.endingIndex = _endingIndex;
    }
    addNewMemo(memo) {
        return __awaiter(this, void 0, void 0, function* () {
            const nowMemo = yield this.memo;
            this.memo = Promise.resolve([memo]);
            return this;
        });
    }
    updateExistingMemo(memo) {
        return __awaiter(this, void 0, void 0, function* () {
            const nowMemo = yield this.memo;
            this.memo = Promise.resolve([memo]);
            return this;
        });
    }
    removeExistingMemo() {
        return __awaiter(this, void 0, void 0, function* () {
            const nowMemo = yield this.memo;
            this.memo = Promise.resolve([]);
            return this;
        });
    }
    getMemo() {
        return this.memo;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Highlight.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => User_1.User, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", User_1.User)
], Highlight.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => Memo_1.Memo, memo => memo.highlight, {
        eager: true
    }),
    (0, typeorm_1.JoinColumn)(),
    (0, class_validator_1.ArrayMaxSize)(1),
    __metadata("design:type", Promise)
], Highlight.prototype, "memo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Highlight.prototype, "scriptId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Highlight.prototype, "startingIndex", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Highlight.prototype, "endingIndex", void 0);
Highlight = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(["scriptId", "startingIndex", "endingIndex"], { unique: true }),
    __metadata("design:paramtypes", [User_1.User, Number, Number, Number])
], Highlight);
exports.Highlight = Highlight;
//# sourceMappingURL=Highlight.js.map