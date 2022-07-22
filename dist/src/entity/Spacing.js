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
exports.Spacing = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Spacing = class Spacing extends typeorm_1.BaseEntity {
    constructor(_user, _scriptId, _index) {
        super();
        this.user = _user;
        this.scriptId = _scriptId;
        this.index = _index;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Spacing.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => User_1.User, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", User_1.User)
], Spacing.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Spacing.prototype, "scriptId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Spacing.prototype, "index", void 0);
Spacing = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [User_1.User, Number, Number])
], Spacing);
exports.Spacing = Spacing;
//# sourceMappingURL=Spacing.js.map