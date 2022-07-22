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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQueryRepository = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const tslog_1 = require("tslog");
const CustomError_1 = __importDefault(require("../error/CustomError"));
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
let UserQueryRepository = class UserQueryRepository extends typeorm_1.Repository {
    // id로 1개의 News 조회
    findByKakaoId(kakaoId) {
        return (this.createQueryBuilder('user')
            // .leftJoinAndSelect('user.favoriteNews', 'news')
            .where('user.kakaoId = :kakaoId', { kakaoId })
            .getOneOrFail());
    }
    findByEmail(email) {
        log.debug('email: ', email);
        return this.createQueryBuilder('user').where('user.email = :email', { email }).getOneOrFail();
    }
    findByKakaoIdActiveRecordManner(kakaoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = yield (0, typeorm_1.getConnection)().getRepository(User_1.User);
            try {
                return yield userRepository.findOneOrFail({
                    where: {
                        kakaoId: kakaoId,
                    },
                    relations: ['favoriteNews'],
                });
            }
            catch (err) {
                log.debug(" >> ERR ", err);
                throw new CustomError_1.default(404, "User Not Found");
            }
        });
    }
};
UserQueryRepository = __decorate([
    (0, typeorm_1.EntityRepository)(User_1.User)
], UserQueryRepository);
exports.UserQueryRepository = UserQueryRepository;
//# sourceMappingURL=UserQueryRepository.js.map