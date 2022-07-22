"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const ErrorHandler_1 = require("../error/ErrorHandler");
const router = (0, express_1.Router)();
const FAVORITE = "/favorite";
router.get(FAVORITE + '/all', (0, ErrorHandler_1.errorHandler)(UserController_1.default.getAllFavoriteNewsList));
router.post(FAVORITE + '/add', (0, ErrorHandler_1.errorHandler)(UserController_1.default.addFavoriteNews));
router.post(FAVORITE + '/remove', (0, ErrorHandler_1.errorHandler)(UserController_1.default.removeFavoriteNews));
exports.default = router;
//# sourceMappingURL=UserRouter.js.map