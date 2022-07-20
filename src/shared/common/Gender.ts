import {Logger} from "tslog";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

export enum Gender {
  MEN = 'male',
  WOMEN = 'female',
  UNSPECIFIED = 'unspecified',
}

export const determineGenderByGivenString = (_genderString: string) => {
  return Object.values(Gender).find((gender) => gender === _genderString);
};

export const convertKoreanToGenderObject = (_givenKoreanString: string[]) => {
  const koreanChar = _givenKoreanString[0];
  if ((koreanChar === '남성') || (koreanChar === '남자')) {
    return [Gender.MEN];
  }
  if ((koreanChar === '여성') || (koreanChar === '여자')) {
    return [Gender.WOMEN];
  }
  return [];
}

export const convertGenderEnglishToKorean = (_gender: Gender) => {
  if (_gender === Gender.MEN) {
    return "남성"
  } else if (_gender === Gender.WOMEN) {
    return "여성"
  } else if (_gender === Gender.UNSPECIFIED) {
    return "분류 안됨"
  }
}
