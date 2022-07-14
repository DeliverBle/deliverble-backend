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
  constructor(id, nickname, profile_image, email, gender) {
    this.id = id;
    this.nickname = nickname;
    this.profile_image = profile_image;
    this.email = email;
    this.gender = gender;
  }

  id: number;
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
