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
exports.Time = void 0;
const typeorm_1 = require("typeorm");
class Time {
    constructor(_seconds, _milliseconds) {
        this._seconds = _seconds;
        this._milliseconds = _milliseconds;
        this.seconds = _seconds;
        this.milliseconds = _milliseconds;
    }
    static toNumber(_time) {
        return Number(parseFloat(_time.seconds.toString())
            .toFixed(2))
            + Number(parseFloat((_time.milliseconds / 100)
                .toFixed(2)));
    }
}
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Time.prototype, "seconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Time.prototype, "milliseconds", void 0);
exports.Time = Time;
//# sourceMappingURL=Time.js.map