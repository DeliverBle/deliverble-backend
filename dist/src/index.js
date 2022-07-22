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
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const routes_1 = __importDefault(require("./routes"));
const ErrorHandler_1 = require("./error/ErrorHandler");
const redis_1 = __importDefault(require("redis"));
const tslog_1 = require("tslog");
const cors = require('cors');
// redis setting
const port = 6379;
const host = "localhost";
const password = "changeme";
const redisClient = redis_1.default.createClient(port, host);
redisClient.auth(password);
const app = (0, express_1.default)();
// CORS 미들웨어 사용
app.use(cors());
// Request body를 parsing 하기 위한 미들웨어 사용
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes 폴더로 분기
app.use(routes_1.default);
app.use(ErrorHandler_1.errorHandler);
const log = new tslog_1.Logger({ name: "딜리버블 백엔드 짱짱" });
(0, typeorm_1.createConnection)().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    // await insertScriptData(connection);
    // const user = await MockUserToFavorite(connection);
    // await insertNewsData(connection);
    app.listen(8080, () => {
        log.info('Server is running on port 8080');
    });
}));
//# sourceMappingURL=index.js.map