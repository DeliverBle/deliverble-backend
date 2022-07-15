import {Logger} from "tslog";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

export enum Gender {
  MEN = 'male',
  WOMEN = 'female',
  UNSPECIFIED = 'unspecified',
}

export const determineGenderByGivenString = (_genderString: string) => {
  log.info(_genderString)
  return Object.values(Gender).find((gender) => gender === _genderString);
};
