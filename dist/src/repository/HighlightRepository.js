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
exports.HighlightQueryRepository = void 0;
const typeorm_1 = require("typeorm");
const Highlight_1 = require("../entity/Highlight");
const CustomError_1 = __importDefault(require("../error/CustomError"));
const tslog_1 = require("tslog");
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
let HighlightQueryRepository = class HighlightQueryRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        // 모든 News 조회
        this.findAllHighlight = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('highlight').getMany();
        });
        this.findAllHighlightByUserId = (user_id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('highlight')
                .where('highlight.user_id = :user_id', { user_id })
                .getMany();
        });
        this.findHighlightByHighlightId = (highlight_id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('highlight')
                .where('highlight.id = :highlight_id', { highlight_id })
                .getOneOrFail();
        });
    }
    // id로 1개의 News 조회
    findById(id) {
        return this.createQueryBuilder('news').where('news.id = :id', { id }).getOne();
    }
    findByHighlightByHighlightIdInActiveRecordManner(highlightId) {
        return __awaiter(this, void 0, void 0, function* () {
            const highlightRepository = yield (0, typeorm_1.getConnection)().getRepository(Highlight_1.Highlight);
            log.debug("highlightId: ", highlightId);
            try {
                return yield highlightRepository.findOneOrFail({
                    where: {
                        id: highlightId.toString(),
                    },
                    relations: ['memo'],
                });
            }
            catch (err) {
                throw new CustomError_1.default(404, "Highlight Not Found");
            }
        });
    }
};
HighlightQueryRepository = __decorate([
    (0, typeorm_1.EntityRepository)(Highlight_1.Highlight)
], HighlightQueryRepository);
exports.HighlightQueryRepository = HighlightQueryRepository;
//# sourceMappingURL=HighlightRepository.js.map