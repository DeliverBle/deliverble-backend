"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NewsController_1 = __importDefault(require("../controllers/NewsController"));
const router = (0, express_1.Router)();
router.post('/search', NewsController_1.default.searchNews);
router.get('/recommend', NewsController_1.default.recommendNews);
router.get('/detail/:newsId', NewsController_1.default.newsDetail);
exports.default = router;
//# sourceMappingURL=NewsRouter.js.map