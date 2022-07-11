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
}

export interface NewsInfo {
  title: string;
  category: Category;
  tags: Tag[];
  announcerGender: Gender;
  channel: Channel;
  link: string;
  time: Time;
  runningTime: Time;
  suitability: Suitability;
  isEmbeddable: boolean;
  reportDate: Date;
}

export interface SearchCondition {
  channels: string[];
  categories: string[];
  announcerGender: string;
  currentPage: number;
  listSize: number;
}
