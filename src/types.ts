import { Category } from './shared/common/Category';
import { convertGenderEnglishToKorean, convertKoreanToGenderObject, Gender } from './shared/common/Gender';
import { Time } from './vo/Time';
import { Suitability } from './shared/common/Suitability';
import { Tag } from './entity/Tag';
import { Channel } from './shared/common/Channel';
import { User } from './entity/User';
import { Logger } from 'tslog';
import {IsNotEmpty} from "class-validator";
import { Highlight } from './entity/Highlight';

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

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
  id: number;
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

export class NewsReturnDTO {
  constructor(newsInfo: NewsInfo) {
    this.id = newsInfo.id;
    this.title = newsInfo.title;
    this.category = newsInfo.category;
    this.announcerGender = convertGenderEnglishToKorean(newsInfo.announcerGender);
    this.channel = newsInfo.channel;
    this.link = newsInfo.link;
    this.thumbnail = newsInfo.thumbnail;
    this.startTime = Time.toNumber(newsInfo.startTime);
    this.endTime = Time.toNumber(newsInfo.endTime);
    this.suitability = newsInfo.suitability;
    this.isEmbeddable = newsInfo.isEmbeddable;
    this.reportDate = newsInfo.reportDate;
    this.tags = newsInfo.tags;
  }
  id: number;
  title: string;
  category: Category;
  announcerGender: string;
  channel: Channel;
  link: string;
  thumbnail: string;
  suitability: Suitability;
  isEmbeddable: boolean;
  reportDate: Date;
  startTime: number;
  endTime: number;
  tags: Tag[];
}

export class NewsScriptReturnDTO {
  constructor(newsInfo: NewsInfo) {
    this.id = newsInfo.id;
    this.title = newsInfo.title;
    this.category = newsInfo.category;
    this.announcerGender = convertGenderEnglishToKorean(newsInfo.announcerGender);
    this.channel = newsInfo.channel;
    this.link = newsInfo.link;
    this.thumbnail = newsInfo.thumbnail;
    this.startTime = Time.toNumber(newsInfo.startTime);
    this.endTime = Time.toNumber(newsInfo.endTime);
    this.suitability = newsInfo.suitability;
    this.isEmbeddable = newsInfo.isEmbeddable;
    this.reportDate = newsInfo.reportDate;
    this.tags = newsInfo.tags;
  }
  id: number;
  title: string;
  category: Category;
  announcerGender: string;
  channel: Channel;
  link: string;
  thumbnail: string;
  suitability: Suitability;
  isEmbeddable: boolean;
  reportDate: Date;
  startTime: number;
  endTime: number;
  tags: Tag[];
  scripts: ScriptReturnDto[];
}

export class SearchCondition {
  constructor(_channels, _categories, _announcerGender, _currentPage, _listSize) {
    this.channels = _channels ? _channels : [];
    this.categories = _categories;
    this.announcerGender = convertKoreanToGenderObject(_announcerGender);
    this.currentPage = _currentPage;
    this.listSize = _listSize;
  }
  // ["남자"] --> ["male"]
  channels: string[];
  categories: string[];
  announcerGender: string[];
  currentPage: number | 1;
  listSize: number | 12;

  getOffset(): number {
    return (this.currentPage - 1) * this.listSize;
  }

  getLimit(): number {
    return this.listSize;
  }
}

export interface Script {
  id: number;
  startTime: Time;
  endTime: Time;
  text: string;
}

export class ScriptReturnDto {
  constructor(script: Script) {
    this.id = script.id;
    this.startTime = Time.toNumber(script.startTime);
    this.endTime = Time.toNumber(script.endTime);
    this.text = script.text;
  }
  id: number;
  startTime: number;
  endTime: number;
  text: string;
}

export class PaginationInfo {
  constructor(_totalCount: number, _lastPage: number) {
    this.totalCount = _totalCount;
    this.lastPage = _lastPage;
  }
  totalCount: number;
  lastPage: number;
}

export class KakaoRawInfo {
  constructor(kakaoId, nickname, profile_image, email, gender) {
    this.kakaoId = kakaoId;
    this.nickname = nickname;
    this.profile_image = profile_image;
    this.email = email;
    this.gender = gender;
  }

  @IsNotEmpty()
  kakaoId: string;
  @IsNotEmpty()
  nickname: string;
  profile_image: string;
  email: string;
  gender: string;

  static toKakaoRawInfo(profile) {
    const {
      id,
      properties: { nickname, profile_image },
      kakao_account: { email, gender },
    } = profile;
    return new KakaoRawInfo(id, nickname, profile_image, email, gender);
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

  doesRetrievedAccessOrRefreshTokenExist(): boolean {
    return (
      this.access_token !== UpdatedAccessTokenDTO.NONE_TOKEN ||
      this.refresh_token !== UpdatedAccessTokenDTO.NONE_TOKEN
    );
  }
}

export class UserInfo {
  constructor(user: User) {
    this.kakaoId = user.kakaoId;
    this.nickname = user.nickname;
    this.email = user.email;
    this.gender = user.gender;
  }
  @IsNotEmpty()
  kakaoId: string;
  nickname: string;
  email: string;
  gender: string;
  favoriteNews?: NewsInfo[] | Promise<NewsInfo[]>;

  addFavoriteNewsAfterPromiseResolved(_favoriteNews: NewsInfo[] | Promise<NewsInfo[]>) {
    this.favoriteNews = _favoriteNews;
    return this.favoriteNews;
  }
}

export interface UserFavoriteNewsReturnDTO {
  readonly kakaoId: string;
  // EAGER LOADING | LAZY LOADING
  readonly favoriteNews: NewsInfo[] | Promise<NewsInfo[]>;
}

export class CreateHighlight {
  constructor(
    _accessToken: string, _kakaoId: string, _scriptId: number, _startingIndex: number, _endingIndex: number
    ) {
    this.accessToken = _accessToken;
    this.kakaoId = _kakaoId;
    this.scriptId = _scriptId;
    this.startingIndex = _startingIndex;
    this.endingIndex = _endingIndex;
  }
  accessToken: string;
  kakaoId: string;
  scriptId: number;
  startingIndex: number;
  endingIndex: number;

  toEntity(user: User): Highlight {
    return new Highlight(user, this.scriptId, this.startingIndex, this.endingIndex);
  }
}

export interface HighlightInfo {
  id: number;
  userId: string;
  scriptId: number;
  startingIndex: number;
  endingIndex: number;
}

export class HighlightReturnDTO {
  constructor(highlight: Highlight) {
    this.scriptId = highlight['scriptId'];
    const { startingIndex, endingIndex } = highlight;
    const _highlightIdx = [Number(startingIndex), Number(endingIndex)];
    this.highlightIdx = [_highlightIdx]
  }
  scriptId: number;
  highlightIdx: [number[]];
}
