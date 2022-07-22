"use strict";
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
exports.SpacingCommandRepository = void 0;
const tslog_1 = require("tslog");
const typeorm_1 = require("typeorm");
const Spacing_1 = require("../entity/Spacing");
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
let SpacingCommandRepository = class SpacingCommandRepository extends typeorm_1.Repository {
    saveNewSpacing(spacing) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSpacing = this.create(spacing);
            return this.save(newSpacing);
        });
    }
    ;
    removeSpacingBySpacingId(spacingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removedSpacing = yield this.delete({ id: spacingId });
                const booleanRemovedOrNot = Boolean(removedSpacing['affected']);
                log.debug('boolean result of removed or not', booleanRemovedOrNot);
                return booleanRemovedOrNot;
            }
            catch (err) {
                log.error(err);
                return false;
            }
        });
    }
    ;
};
SpacingCommandRepository = __decorate([
    (0, typeorm_1.EntityRepository)(Spacing_1.Spacing)
], SpacingCommandRepository);
exports.SpacingCommandRepository = SpacingCommandRepository;
//# sourceMappingURL=SpacingCommandRepository.js.map