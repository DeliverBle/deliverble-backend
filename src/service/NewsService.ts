import { getConnection } from 'typeorm';
import { NewsQueryRepository } from '../repository/NewsRepository';
import { sortByDateAndTitle } from '../shared/common/utils';
import { News } from '../entity/News/News';
import { Logger } from 'tslog';
import message from '../modules/responseMessage';
import CustomError from '../error/CustomError';
import { getLastPage } from '../util/pagination';
import { Tag } from '../entity/Tag/Tag';
import statusCode from '../modules/statusCode';
import {ConditionList} from "../types/SearchCondition/ConditionList";
import {hasCategories} from "../types/SearchCondition/hasCategories";
import {hasChannels} from "../types/SearchCondition/hasChannels";
import {hasAnnouncerGender} from "../types/SearchCondition/hasAnnouncerGender";
import {hasFindAll} from "../types/SearchCondition/hasFindAll";
import {NewsInfo} from "../entity/News/types/newsInfo";
import {NewsReturnDTO} from "../entity/News/types/newsReturnDTO";
import {NewsScriptReturnDTO} from "../entity/News/types/NewsScriptReturnDTO";
import {SearchCondition} from "../types/SearchCondition/SearchCondition";
import {ScriptReturnDto} from "../entity/Script/ScriptReturnDto";
import {PaginationInfo} from "../types/PaginationInterface/PaginationInfo";
import {TagOfNewsReturnDtoCollection} from "../entity/Tag/types/TagOfNewsReturnDtoCollection";
import {TagOfEachNewsReturnDto} from "../entity/Tag/types/TagOfEachNewsReturnDto";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

const getConnectionToMySql = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(NewsQueryRepository);
};

const searchTagsByNewsIds = async (newsList: News[]): Promise<TagOfNewsReturnDtoCollection> => {
  const newsRepository = await getConnectionToMySql();
  let newsIdList = newsList.map((news) => news.id);
  // TODO: 추후 Active Record 사용 하지 말 것
  let newsData: News[] = await newsRepository.findByIds(newsIdList, {
    relations: ['tags'],
  });
  let tagDataOfEachNews: Tag[][] = newsData.map((news) => news.tags);
  const tagDataOfEachNewsMappedList = tagDataOfEachNews.map((acc, cur, idx) => {
    return new TagOfEachNewsReturnDto(acc);
  }, []);
  return new TagOfNewsReturnDtoCollection(tagDataOfEachNewsMappedList);
};

const searchAllNews = async (): Promise<any> => {
  const newsRepository = await getConnectionToMySql();
  let newsData = await newsRepository.find();
  let totalCount = newsData.length;
  let lastPage = getLastPage(12, totalCount);
  let paginationInfo = new PaginationInfo(totalCount, lastPage);
  return [newsData, paginationInfo];
};

const searchByChannel = async (searchCondition: SearchCondition) => {
  const newsRepository = await getConnectionToMySql();
  return await newsRepository.findByChannels(searchCondition);
};

const searchByCategory = async (searchCondition: SearchCondition) => {
  const newsRepository = await getConnectionToMySql();
  return await newsRepository.findByCategories(searchCondition.categories);
};

const searchByGender = async (searchCondition: SearchCondition): Promise<NewsInfo[]> => {
  const newsRepository = await getConnectionToMySql();

  try {
    return await newsRepository.findByAnnouncerGender(searchCondition.announcerGender);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchByChannel = async (
  conditionList: ConditionList,
  searchCondition: SearchCondition,
  // TODO: The return value type `[News[], number]` to be wrapped with first collection
): Promise<any> => {
  const newsRepository = await getConnectionToMySql();

  if (hasFindAll(conditionList) || searchCondition.channels.length === 0) {
    return await newsRepository.findAllNews(searchCondition);
  }
  if (hasChannels(conditionList)) {
    return await newsRepository.findByChannels(searchCondition);
  }
  return await newsRepository.findAllNews(searchCondition);
};

const filterNewsDataByCategory = (newsData: any, searchCondition: SearchCondition) => {
  if (searchCondition.categories.length === 0) {
    return newsData;
  }
  const filteredNewsData = newsData.filter((news) => {
    if (searchCondition.categories.includes(news.category)) {
      console.log(news);
      return news;
    }
  });
  // TODO: wrapping newsData with first collection so that avoiding any mistakes
  return filteredNewsData;
};

const filterNewsDataByAnnouncerGender = (newsData: any, searchCondition: SearchCondition) => {
  if (searchCondition.announcerGender.length == 0) {
    return newsData;
  }
  const filteredNewsData = newsData.filter((news) => {
    if (searchCondition.announcerGender.includes(news.announcerGender)) {
      return news;
    }
  });
  // TODO: wrapping newsData with first collection so that avoiding any mistakes
  return filteredNewsData;
};

const validateNewsDataLength = (offset: number, newsData: NewsInfo[]) => {
  if (offset > newsData.length) {
    log.debug('error point check');
    throw new CustomError(statusCode.BAD_REQUEST, message.EXCEED_PAGE_INDEX);
  }
};

const paginateWithOffsetAndLimit = (searchCondition: SearchCondition, newsData: NewsInfo[]) => {
  const offset = searchCondition.getOffset();
  const limit = searchCondition.getLimit();
  const endIndex = offset + limit;

  try {
    validateNewsDataLength(offset, newsData);
    return newsData.slice(offset, endIndex);
  } catch (error) {
    throw new CustomError(statusCode.BAD_REQUEST, message.EXCEED_PAGE_INDEX)
  }
};

const searchByConditions = async (
  conditionList: ConditionList,
  searchCondition: SearchCondition,
  // TODO: using any type is evil! change appropriate data type
): Promise<any> => {
  let newsData = await fetchByChannel(conditionList, searchCondition);
  if (hasCategories(conditionList)) {
    const filteredNewsData = await filterNewsDataByCategory(newsData, searchCondition);
    newsData = filteredNewsData;
  }

  if (hasAnnouncerGender(conditionList)) {
    const filteredNewsData = await filterNewsDataByAnnouncerGender(newsData, searchCondition);
    // TODO: wrapping newsData with first collection so that avoiding any mistakes
    newsData = filteredNewsData;
  }

  // pagination offset, listsize에 맞게 슬라이싱하기 전 totalCount, lastPage를 구함
  let totalCount = newsData.length;
  let lastPage = getLastPage(12, totalCount);
  let paginationInfo = new PaginationInfo(totalCount, lastPage);

  // TODO: wrapping newsData with first collection so that avoiding any mistakes
  newsData = sortByDateAndTitle([newsData]);
  try {
    newsData = paginateWithOffsetAndLimit(searchCondition, newsData);
  } catch (error) {
    log.debug("error", error)
    throw new CustomError(statusCode.BAD_REQUEST, message.EXCEED_PAGE_INDEX)
  }
  let newsDataReturn: NewsReturnDTO[] = [];
  for (let i in newsData) {
    let news = new NewsReturnDTO(newsData[i]);
    newsDataReturn.push(news);
  }

  return [newsDataReturn, paginationInfo];
};

const searchRecommendNews = async () => {
  const recommendCount: number = 8;
  const newsRepository = await getConnectionToMySql();
  let newsData = await newsRepository.findRecommendNews();
  let newsDataReturn: NewsReturnDTO[] = [];
  for (let i in newsData) {
    let news = new NewsReturnDTO(newsData[i]);
    newsDataReturn.push(news);
  }
  newsDataReturn = sortByDateAndTitle([newsDataReturn]);
  return newsDataReturn.slice(0, recommendCount);
};

const findNewsDetail = async (newsId: number): Promise<NewsScriptReturnDTO> => {
  const newsRepository = await getConnectionToMySql();
  let newsData: NewsInfo = await newsRepository.findNewsDetail(newsId);
  let newsScriptData = new NewsScriptReturnDTO(newsData);
  newsScriptData['scripts'] = newsData['scripts'];
  // console.log( newsScriptData['scripts']);
  let scriptList: ScriptReturnDto[] = [];
  for (let i in newsData['scripts']) {
    console.log(newsData['scripts'][i]);
    let script = new ScriptReturnDto(newsData['scripts'][i]);
    scriptList.push(script);
  }
  newsScriptData['scripts'] = scriptList;
  return newsScriptData;
};

const searchByNewsId = async (newsId: string) => {
  const newsRepository = await getConnectionToMySql();
  try {
    return await newsRepository.findByNewsId(newsId);
  } catch {
    log.debug('meow');
    // TODO: need an another handler for this error
    throw new CustomError(404, 'News Not Found');
  }
};

export const findScriptIdsByNewsId = async (newsId: string): Promise<number[]> => {
  const newsDetailDTO = await findNewsDetail(Number(newsId));
  return newsDetailDTO.scripts.map((script) => script.id);
};

export default {
  searchAllNews,
  searchByCategory,
  searchByChannel,
  searchByGender,
  searchByConditions,
  searchRecommendNews,
  findNewsDetail,
  searchByNewsId,
  findScriptIdsByNewsId,
  searchTagsByNewsIds,
};
