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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertScriptData = void 0;
const News_1 = require("../entity/News");
const Script_1 = require("../entity/Script");
const Time_1 = require("../vo/Time");
const tslog_1 = require("tslog");
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
// 뉴스 별 스크립트 생성
const insertScriptData = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    const scriptRepository = yield Script_1.Script.getRepository();
    const newsRepository = yield News_1.News.getRepository();
    ;
    const scripts = [
        {
            news_id: 1,
            startTime: new Time_1.Time(6, 0),
            endTime: new Time_1.Time(56, 0),
            text: 'test',
        },
    ];
    const scripts1 = scriptRepository.create(scripts);
    const scripts2 = yield scriptRepository.save(scripts1);
    for (let i in scripts2) {
        const scripts3 = yield scriptRepository.find({
            where: {
                id: scripts2[i].id,
            },
        });
        const news = yield newsRepository.find({
            where: {
                id: scripts[i].news_id,
            },
        });
        log.debug(scripts[i].news_id);
        log.debug(news);
        // console.log(scripts1[i].news_id)
        // console.log(scripts2[i].news_id)
        log.debug(scripts3);
    }
});
exports.insertScriptData = insertScriptData;
//# sourceMappingURL=insertScript.js.map