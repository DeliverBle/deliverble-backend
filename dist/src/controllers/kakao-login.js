"use strict";
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
const passport_1 = __importDefault(require("passport"));
const passport_kakao_1 = __importDefault(require("passport-kakao"));
const tslog_1 = require("tslog");
require("dotenv").config();
const log = new tslog_1.Logger({ name: '카카오 로그인 좀 되자!' });
function kakaoLoginStrategy() {
    passport_1.default.use('kakao-login', new passport_kakao_1.default({
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: process.env.KAKAO_CALLBACK_URL,
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        // log.debug(`accessToken`, accessToken);
        done(null, [accessToken, refreshToken, profile._json.id]);
    })));
}
exports.default = kakaoLoginStrategy;
//# sourceMappingURL=kakao-login.js.map