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
exports.Memo = void 0;
const typeorm_1 = require("typeorm");
const Highlight_1 = require("./Highlight");
let Memo = class Memo extends typeorm_1.BaseEntity {
    constructor(_keyword, _content) {
        super();
        this.keyword = _keyword;
        this.content = _content;
    }
    updateMemo(updateMemoDTO) {
        this.keyword = updateMemoDTO.keyword;
        this.content = updateMemoDTO.content;
        return this;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Memo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Memo.prototype, "keyword", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Memo.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => Highlight_1.Highlight, (highlight) => highlight.memo, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Highlight_1.Highlight)
], Memo.prototype, "highlight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'highlightId', nullable: true }),
    __metadata("design:type", Number)
], Memo.prototype, "highlightId", void 0);
Memo = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, String])
], Memo);
exports.Memo = Memo;
//# sourceMappingURL=Memo.js.map