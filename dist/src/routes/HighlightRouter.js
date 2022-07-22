"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HighlightController_1 = __importDefault(require("../controllers/HighlightController"));
const router = (0, express_1.Router)();
const MEMO = '/memo';
router.post(MEMO + '/update', HighlightController_1.default.updateExistingMemoOfHighlight);
router.post(MEMO + '/remove', HighlightController_1.default.removeExistingMemoOfHighlight);
router.post(MEMO + '/add', HighlightController_1.default.addNewMemoOfHighlight);
router.post('/remove', HighlightController_1.default.removeHighlightByKakaoIdAndHighlightId);
router.post('/create', HighlightController_1.default.createHighlight);
router.get('/', HighlightController_1.default.getHighlightByKakaoIdAndNewsId);
exports.default = router;
//# sourceMappingURL=HighlightRouter.js.map