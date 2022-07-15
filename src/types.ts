import { Category } from './shared/common/Category';
import { Gender } from './shared/common/Gender';
import { Time } from './vo/Time';
import { Suitability } from './shared/common/Suitability';
import { Tag } from './entity/Tag';
import { Channel } from './shared/common/Channel';

export interface ConditionList {
  channels: boolean;
  categories: boolean;
  announcerGender: boolean;
  findAll: boolean;
}

export const hasCategories = (conditionList: ConditionList): boolean => {
  return conditionList.categories;
};

export const hasChannels = (conditionList: ConditionList): boolean => {
  return conditionList.channels;
};

export const hasAnnouncerGender = (conditionList: ConditionList): boolean => {
  return conditionList.announcerGender;
};

export const hasFindAll = (conditionList: ConditionList): boolean => {
  return conditionList.findAll;
};

export interface NewsInfo {
  title: string;
  category: Category;
  tags: Tag[];
  announcerGender: Gender;
  channel: Channel;
  link: string;
  thumbnail: string;
  startTime: Time;
  endTime: Time;
  suitability: Suitability;
  isEmbeddable: boolean;
  reportDate: Date;
}

export class SearchCondition {
  constructor(_channels, _categories, _announcerGender, _currentPage, _listSize) {
    this.channels = _channels;
    this.categories = _categories;
    this.announcerGender = _announcerGender;
    this.currentPage = _currentPage;
    this.listSize = _listSize;
  }

  channels: string[];
  categories: string[];
  announcerGender: string;
  currentPage: number | 1;
  listSize: number | 12;

  getOffset(): number {
    return (this.currentPage - 1) * this.listSize;
  }

  getLimit(): number {
    return this.listSize;
  }
}

export class KakaoRawInfo {
  constructor(kakaoId, nickname, profile_image, email, gender) {
    this.kakaoId = kakaoId;
    this.nickname = nickname;
    this.profile_image = profile_image;
    this.email = email;
    this.gender = gender;
  }

  kakaoId: string;
  nickname: string;
  profile_image: string;
  email: string;
  gender: string;

  static toKakaoRawInfo(profile) {
    const {
      id,
      properties: { nickname, profile_image },
      kakao_account: { email },
    } = profile;
    return new KakaoRawInfo(id, nickname, profile_image, email, Gender.UNSPECIFIED.toString());
  }
}

export class UpdatedAccessTokenDTO {
  static NONE_TOKEN = 'NONE';
  constructor(
    _access_token: string,
    _expires_in: string,
    _refresh_token: string | undefined,
    _refresh_token_expires_in: string | undefined,
  ) {
    this.access_token = _access_token;
    this.expires_in = _expires_in;
    this.refresh_token = !_refresh_token ? UpdatedAccessTokenDTO.NONE_TOKEN : _refresh_token;
    this.refresh_token_expires_in = !_refresh_token_expires_in
      ? UpdatedAccessTokenDTO.NONE_TOKEN
      : _refresh_token_expires_in;
  }
  access_token: string;
  expires_in: string;
  // TODO: NONE이면 반환하지 않는 방법 고민해보기
  refresh_token?: string;
  refresh_token_expires_in?: string;

  doesRetrievedRefreshTokenExist(): boolean {
    return (
      this.refresh_token !== UpdatedAccessTokenDTO.NONE_TOKEN &&
      this.refresh_token_expires_in !== UpdatedAccessTokenDTO.NONE_TOKEN
    );
  }
}
