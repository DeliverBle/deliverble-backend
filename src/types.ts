import { Category } from './shared/common/Category';
import { Gender } from './shared/common/Gender';
import { Time } from './vo/Time';
import { Suitability } from './shared/common/Suitability';
import { Tag } from './entity/Tag';

export interface NewsInfo {
  title: string;
  category: Category;
  tags: Tag[];
  announcerGender: Gender;
  link: string;
  time: Time;
  runningTime: Time;
  suitability: Suitability;
  isEmbeddable: boolean;
  reportDate: Date;
}

export interface SearchCondition {
  channel: string[];
  category: string[];
  speaker: string[];
  currentPage: number;
  listSize: number;
}
