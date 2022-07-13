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

export abstract class SearchCondition {
  channels: string[];
  categories: string[];
  announcerGender: string;
  currentPage: number | 1;
  listSize: number | 12;

  getChannels(): string[] {
    return this.channels;
  }

  getOffset(): number {
    return this.currentPage - 1 * this.listSize;
  }

  getLimit(): number {
    return this.listSize;
  }
}
