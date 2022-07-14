export enum Gender {
  MEN = '남자',
  WOMEN = '여자',
  UNSPECIFIED = '분류안됨',
}

export const determineGenderByGivenString = (_genderString: string) => {
  return Object.values(Gender).find((gender) => gender === _genderString);
};
