"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertGenderEnglishToKorean = exports.convertKoreanToGenderObject = exports.determineGenderByGivenString = exports.Gender = void 0;
const tslog_1 = require("tslog");
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
var Gender;
(function (Gender) {
    Gender["MEN"] = "male";
    Gender["WOMEN"] = "female";
    Gender["UNSPECIFIED"] = "unspecified";
})(Gender = exports.Gender || (exports.Gender = {}));
const determineGenderByGivenString = (_genderString) => {
    return Object.values(Gender).find((gender) => gender === _genderString);
};
exports.determineGenderByGivenString = determineGenderByGivenString;
const convertKoreanToGenderObject = (_givenKoreanString) => {
    const koreanChar = _givenKoreanString[0];
    if ((koreanChar === '남성') || (koreanChar === '남자')) {
        return [Gender.MEN];
    }
    if ((koreanChar === '여성') || (koreanChar === '여자')) {
        return [Gender.WOMEN];
    }
    return [];
};
exports.convertKoreanToGenderObject = convertKoreanToGenderObject;
const convertGenderEnglishToKorean = (_gender) => {
    if (_gender === Gender.MEN) {
        return "남성";
    }
    else if (_gender === Gender.WOMEN) {
        return "여성";
    }
    else if (_gender === Gender.UNSPECIFIED) {
        return "분류 안됨";
    }
};
exports.convertGenderEnglishToKorean = convertGenderEnglishToKorean;
//# sourceMappingURL=Gender.js.map