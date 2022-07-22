"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SpacingController_1 = __importDefault(require("../controllers/SpacingController"));
const router = (0, express_1.Router)();
router.post('/create', SpacingController_1.default.createSpacing);
router.get('/', SpacingController_1.default.getSpacing);
router.post('/remove', SpacingController_1.default.removeSpacing);
exports.default = router;
//# sourceMappingURL=SpacingRouter.js.map