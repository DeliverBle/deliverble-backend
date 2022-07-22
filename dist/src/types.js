"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveSpacing = exports.SpacingReturnCollectionDTO = exports.SpacingReturnDTO = exports.GetSpacing = exports.CreateSpacing = exports.TagOfEachNewsReturnDto = exports.TagOfNewsReturnDtoCollection = exports.UpdateExistingMemoDTO = exports.RemoveExistingMemoDTO = exports.AddMemoDTO = exports.HighlightReturnDTO = exports.HighlightReturnCollectionDTO = exports.CreateHighlight = exports.UserInfo = exports.UpdatedAccessTokenDTO = exports.KakaoRawInfo = exports.PaginationInfo = exports.ScriptReturnDto = exports.SearchCondition = exports.NewsScriptReturnDTO = exports.NewsReturnDTO = exports.NewsReturnDTOCollection = exports.hasFindAll = exports.hasAnnouncerGender = exports.hasChannels = exports.hasCategories = void 0;
const Gender_1 = require("./shared/common/Gender");
const Time_1 = require("./vo/Time");
const tslog_1 = require("tslog");
const class_validator_1 = require("class-validator");
const Highlight_1 = require("./entity/Highlight");
const Spacing_1 = require("./entity/Spacing");
const Memo_1 = require("./entity/Memo");
const MemoArrayWrappedObject_1 = require("./vo/MemoArrayWrappedObject");
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
const hasCategories = (conditionList) => {
    return conditionList.categories;
};
exports.hasCategories = hasCategories;
const hasChannels = (conditionList) => {
    return conditionList.channels;
};
exports.hasChannels = hasChannels;
const hasAnnouncerGender = (conditionList) => {
    return conditionList.announcerGender;
};
exports.hasAnnouncerGender = hasAnnouncerGender;
const hasFindAll = (conditionList) => {
    return conditionList.findAll;
};
exports.hasFindAll = hasFindAll;
class NewsReturnDTOCollection {
    constructor(newsInfoList, favoriteNewsTagList) {
        this.newsInfoList = newsInfoList;
        this.favoriteNewsTagList = favoriteNewsTagList;
    }
    toNewsReturnDTOList() {
        return this.newsInfoList.map((acc, cur, idx) => {
            const nowReturnNewsDto = new NewsReturnDTO(acc);
            log.debug('get set 막 쓰고 있네 망했다~~: ', nowReturnNewsDto, this.favoriteNewsTagList, cur);
            // TODO: ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
            if (this.favoriteNewsTagList instanceof TagOfNewsReturnDtoCollection) {
                const nowTagOfEachNewsDto = this.favoriteNewsTagList.getCollectionById(cur).getTags();
                nowReturnNewsDto.setTag(nowTagOfEachNewsDto);
            }
            return nowReturnNewsDto;
        });
    }
}
exports.NewsReturnDTOCollection = NewsReturnDTOCollection;
class NewsReturnDTO {
    constructor(newsInfo) {
        this.id = newsInfo.id;
        this.title = newsInfo.title;
        this.category = newsInfo.category;
        this.announcerGender = (0, Gender_1.convertGenderEnglishToKorean)(newsInfo.announcerGender);
        this.channel = newsInfo.channel;
        this.link = newsInfo.link;
        this.thumbnail = newsInfo.thumbnail;
        this.startTime = Time_1.Time.toNumber(newsInfo.startTime);
        this.endTime = Time_1.Time.toNumber(newsInfo.endTime);
        this.suitability = newsInfo.suitability;
        this.isEmbeddable = newsInfo.isEmbeddable;
        this.reportDate = newsInfo.reportDate;
        this.tags = newsInfo.tags;
    }
    setTag(tagOfEachNewsReturnDto) {
        this.tags = tagOfEachNewsReturnDto;
    }
}
exports.NewsReturnDTO = NewsReturnDTO;
class NewsScriptReturnDTO {
    constructor(newsInfo) {
        this.id = newsInfo.id;
        this.title = newsInfo.title;
        this.category = newsInfo.category;
        this.announcerGender = (0, Gender_1.convertGenderEnglishToKorean)(newsInfo.announcerGender);
        this.channel = newsInfo.channel;
        this.link = newsInfo.link;
        this.thumbnail = newsInfo.thumbnail;
        this.startTime = Time_1.Time.toNumber(newsInfo.startTime);
        this.endTime = Time_1.Time.toNumber(newsInfo.endTime);
        this.suitability = newsInfo.suitability;
        this.isEmbeddable = newsInfo.isEmbeddable;
        this.reportDate = newsInfo.reportDate;
        this.tags = newsInfo.tags;
    }
}
exports.NewsScriptReturnDTO = NewsScriptReturnDTO;
class SearchCondition {
    constructor(_channels, _categories, _announcerGender, _currentPage, _listSize) {
        this.channels = _channels ? _channels : [];
        this.categories = _categories;
        this.announcerGender = (0, Gender_1.convertKoreanToGenderObject)(_announcerGender);
        this.currentPage = _currentPage;
        this.listSize = _listSize;
    }
    getOffset() {
        return (this.currentPage - 1) * this.listSize;
    }
    getLimit() {
        return this.listSize;
    }
}
exports.SearchCondition = SearchCondition;
class ScriptReturnDto {
    constructor(script) {
        this.id = script.id;
        this.startTime = Time_1.Time.toNumber(script.startTime);
        this.endTime = Time_1.Time.toNumber(script.endTime);
        this.text = script.text;
    }
}
exports.ScriptReturnDto = ScriptReturnDto;
class PaginationInfo {
    constructor(_totalCount, _lastPage) {
        this.totalCount = _totalCount;
        this.lastPage = _lastPage;
    }
}
exports.PaginationInfo = PaginationInfo;
class KakaoRawInfo {
    constructor(kakaoId, nickname, profile_image, email, gender) {
        this.kakaoId = kakaoId;
        this.nickname = nickname;
        this.profile_image = profile_image;
        this.email = email;
        this.gender = gender;
    }
    static toKakaoRawInfo(profile) {
        const { id, properties: { nickname, profile_image }, kakao_account: { email, gender }, } = profile;
        return new KakaoRawInfo(id, nickname, profile_image, email, gender);
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], KakaoRawInfo.prototype, "kakaoId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], KakaoRawInfo.prototype, "nickname", void 0);
exports.KakaoRawInfo = KakaoRawInfo;
class UpdatedAccessTokenDTO {
    constructor(_access_token, _expires_in, _refresh_token, _refresh_token_expires_in) {
        this.access_token = _access_token;
        this.expires_in = _expires_in;
        this.refresh_token = !_refresh_token ? UpdatedAccessTokenDTO.NONE_TOKEN : _refresh_token;
        this.refresh_token_expires_in = !_refresh_token_expires_in
            ? UpdatedAccessTokenDTO.NONE_TOKEN
            : _refresh_token_expires_in;
    }
    doesRetrievedAccessOrRefreshTokenExist() {
        return (this.access_token !== UpdatedAccessTokenDTO.NONE_TOKEN ||
            this.refresh_token !== UpdatedAccessTokenDTO.NONE_TOKEN);
    }
}
exports.UpdatedAccessTokenDTO = UpdatedAccessTokenDTO;
UpdatedAccessTokenDTO.NONE_TOKEN = 'NONE';
class UserInfo {
    constructor(user) {
        this.kakaoId = user.kakaoId;
        this.nickname = user.nickname;
        this.email = user.email;
        this.gender = user.gender;
    }
    addFavoriteNewsAfterPromiseResolved(_favoriteNews) {
        this.favoriteNews = _favoriteNews;
        return this.favoriteNews;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserInfo.prototype, "kakaoId", void 0);
exports.UserInfo = UserInfo;
class CreateHighlight {
    constructor(_accessToken, _kakaoId, _scriptId, _startingIndex, _endingIndex) {
        this.accessToken = _accessToken;
        this.kakaoId = _kakaoId;
        this.scriptId = _scriptId;
        this.startingIndex = _startingIndex;
        this.endingIndex = _endingIndex;
    }
    toEntity(user) {
        return new Highlight_1.Highlight(user, this.scriptId, this.startingIndex, this.endingIndex);
    }
}
exports.CreateHighlight = CreateHighlight;
class HighlightReturnCollectionDTO {
    constructor(_highlightReturnCollection) {
        this.highlightReturnCollection = _highlightReturnCollection;
        this.sortByScriptIdFirstAndStartingIndexWhenScriptIdEquals();
    }
    static createCollection(_highlightReturnCollection) {
        return new HighlightReturnCollectionDTO(_highlightReturnCollection);
    }
    sortByScriptIdFirstAndStartingIndexWhenScriptIdEquals() {
        this.highlightReturnCollection = this.highlightReturnCollection.sort((a, b) => {
            if (a.scriptId === b.scriptId) {
                return a.startingIndex - b.startingIndex;
            }
            return a.scriptId - b.scriptId;
        });
        return this;
    }
}
exports.HighlightReturnCollectionDTO = HighlightReturnCollectionDTO;
class HighlightReturnDTO {
    constructor(highlight) {
        this.scriptId = highlight.scriptId;
        this.highlightId = highlight.id;
        this.startingIndex = highlight.startingIndex;
        this.endingIndex = highlight.endingIndex;
    }
    static createHighlightReturnDTOWithMemo(highlight) {
        return __awaiter(this, void 0, void 0, function* () {
            const newHighlight = new HighlightReturnDTO(highlight);
            const toReturnMemo = yield highlight.getMemo();
            const toWrappedMemo = (0, MemoArrayWrappedObject_1.createMemoArrayWrappedObject)(yield highlight.getMemo());
            newHighlight.memo = toWrappedMemo;
            return newHighlight;
        });
    }
}
exports.HighlightReturnDTO = HighlightReturnDTO;
class AddMemoDTO {
    constructor(_accessToken, _kakaoId, _highlightId, _keyword, _content) {
        this.accessToken = _accessToken;
        this.kakaoId = _kakaoId;
        this.highlightId = _highlightId;
        this.keyword = _keyword;
        this.content = _content;
    }
    toEntity() {
        return new Memo_1.Memo(this.keyword, this.content);
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], AddMemoDTO.prototype, "accessToken", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], AddMemoDTO.prototype, "kakaoId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], AddMemoDTO.prototype, "highlightId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], AddMemoDTO.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], AddMemoDTO.prototype, "content", void 0);
exports.AddMemoDTO = AddMemoDTO;
class RemoveExistingMemoDTO {
    constructor(_accessToken, _kakaoId, _highlightId) {
        this.accessToken = _accessToken;
        this.kakaoId = _kakaoId;
        this.highlightId = _highlightId;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], RemoveExistingMemoDTO.prototype, "accessToken", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], RemoveExistingMemoDTO.prototype, "kakaoId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], RemoveExistingMemoDTO.prototype, "highlightId", void 0);
exports.RemoveExistingMemoDTO = RemoveExistingMemoDTO;
class UpdateExistingMemoDTO {
    constructor(_accessToken, _kakaoId, _highlightId, _keyword, _content) {
        this.accessToken = _accessToken;
        this.kakaoId = _kakaoId;
        this.highlightId = _highlightId;
        this.keyword = _keyword;
        this.content = _content;
    }
    toEntity() {
        return new Memo_1.Memo(this.keyword, this.content);
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], UpdateExistingMemoDTO.prototype, "accessToken", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], UpdateExistingMemoDTO.prototype, "kakaoId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], UpdateExistingMemoDTO.prototype, "highlightId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], UpdateExistingMemoDTO.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], UpdateExistingMemoDTO.prototype, "content", void 0);
exports.UpdateExistingMemoDTO = UpdateExistingMemoDTO;
class TagOfNewsReturnDtoCollection {
    constructor(_tagOfNewsReturnDtoCollection) {
        this.tagDataOfEachNewsCollection = _tagOfNewsReturnDtoCollection;
    }
    getCollectionById(id) {
        return this.tagDataOfEachNewsCollection[id];
    }
}
exports.TagOfNewsReturnDtoCollection = TagOfNewsReturnDtoCollection;
class TagOfEachNewsReturnDto {
    constructor(tags) {
        this.tags = tags;
    }
    getTags() {
        return this.tags;
    }
}
exports.TagOfEachNewsReturnDto = TagOfEachNewsReturnDto;
class CreateSpacing {
    constructor(_accessToken, _kakaoId, _scriptId, _newsId, _index) {
        this.accessToken = _accessToken;
        this.kakaoId = _kakaoId;
        this.scriptId = _scriptId;
        this.newsId = _newsId;
        this.index = _index;
    }
    toEntity(user) {
        return new Spacing_1.Spacing(user, this.scriptId, this.index);
    }
}
exports.CreateSpacing = CreateSpacing;
class GetSpacing {
    constructor(_accessToken, _kakaoId, _newsId) {
        this.accessToken = _accessToken;
        this.kakaoId = _kakaoId;
        this.newsId = _newsId;
    }
}
exports.GetSpacing = GetSpacing;
class SpacingReturnDTO {
    constructor(spacing) {
        this.spacingId = spacing.id;
        this.scriptId = spacing.scriptId;
        this.index = spacing.index;
    }
}
exports.SpacingReturnDTO = SpacingReturnDTO;
class SpacingReturnCollectionDTO {
    constructor(_spacingReturnCollection) {
        this.spacingReturnCollection = _spacingReturnCollection;
        this.sortByScriptIdFirstAndIndexWhenScriptIdEquals();
    }
    sortByScriptIdFirstAndIndexWhenScriptIdEquals() {
        this.spacingReturnCollection = this.spacingReturnCollection.sort((a, b) => {
            if (a.scriptId === b.scriptId) {
                return a.index - b.index;
            }
            return a.scriptId - b.scriptId;
        });
        return this;
    }
}
exports.SpacingReturnCollectionDTO = SpacingReturnCollectionDTO;
class RemoveSpacing {
    constructor(_accessToken, _kakaoId, _newsId, _spacingId) {
        this.accessToken = _accessToken;
        this.kakaoId = _kakaoId;
        this.newsId = _newsId;
        this.spacingId = _spacingId;
    }
}
exports.RemoveSpacing = RemoveSpacing;
//# sourceMappingURL=types.js.map