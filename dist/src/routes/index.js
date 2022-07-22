"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NewsRouter_1 = __importDefault(require("./NewsRouter"));
const kakaoRouter_1 = __importDefault(require("./kakaoRouter"));
const UserRouter_1 = __importDefault(require("./UserRouter"));
const HighlightRouter_1 = __importDefault(require("./HighlightRouter"));
const SpacingRouter_1 = __importDefault(require("./SpacingRouter"));
const VERSION2 = '/v2';
const router = (0, express_1.Router)();
router.get('/', function (req, res, next) {
    res.send('hello');
});
router.use(VERSION2 + '/user', UserRouter_1.default);
router.use(VERSION2 + '/news', NewsRouter_1.default);
router.use(VERSION2 + '/auth', kakaoRouter_1.default);
router.use(VERSION2 + '/highlight', HighlightRouter_1.default);
router.use(VERSION2 + '/spacing', SpacingRouter_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map