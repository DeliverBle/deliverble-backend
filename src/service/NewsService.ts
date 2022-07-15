import { getConnection, Logger } from 'typeorm';
import { NewsQueryRepository } from '../repository/NewsRepository';
import { sortByDateAndTitle } from '../shared/common/utils';
import {
  ConditionList,
  hasAnnouncerGender,
  hasCategories,
  hasChannels,
  hasFindAll,
  NewsInfo,
  NewsReturnDTO,
  NewsScriptReturnDTO,
  Script,
  ScriptReturnDto,
  SearchCondition,
} from '../types';
import { News } from '../entity/News';
import message from '../modules/responseMessage';

const getConnectionToMySql = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(NewsQueryRepository);
};

const searchAllNews = async () => {
  const newsRepository = await getConnectionToMySql();
  return await newsRepository.find();
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

  console.log('hasFindAll >>>>>>> ', hasFindAll(conditionList));

  if (hasFindAll(conditionList)) {
    return await newsRepository.findAllNews(searchCondition);
  }
  if (hasChannels(conditionList)) {
    return await newsRepository.findByChannels(searchCondition);
  }
  return await newsRepository.findAllNews(searchCondition);
};

const filterNewsDataByCategory = (newsData: any, searchCondition: SearchCondition) => {
  const filteredNewsData = newsData.filter((news) => {
    if (searchCondition.categories.includes(news.category)) {
      return news;
    }
  });
  // TODO: wrapping newsData with first collection so that avoiding any mistakes
  return [filteredNewsData, filteredNewsData.length];
};

const filterNewsDataByAnnouncerGender = (newsData: any, searchCondition: SearchCondition) => {
  const filteredNewsData = newsData.filter((news) => {
    if (news.announcerGender === searchCondition.announcerGender) {
      return news;
    }
  });
  console.log('filterNewsDataByAnnouncerGender', filteredNewsData);
  // TODO: wrapping newsData with first collection so that avoiding any mistakes
  return [filteredNewsData];
};

const validateNewsDataLength = (offset: number, newsData: NewsInfo[]) => {
  if (offset > newsData.length) {
    throw new Error(message.EXCEED_PAGE_INDEX);
  }
};

const paginateWithOffsetAndLimit = (searchCondition: SearchCondition, newsData: NewsInfo[]) => {
  const offset = searchCondition.getOffset();
  const limit = searchCondition.getLimit();
  const endIndex = offset + limit;

  validateNewsDataLength(offset, newsData);
  return newsData.slice(offset, endIndex);
};

const searchByConditions = async (
  conditionList: ConditionList,
  searchCondition: SearchCondition,
  // TODO: using any type is evil! change appropriate data type
): Promise<any> => {
  let totalCount;
  let newsData = await fetchByChannel(conditionList, searchCondition);
  if (hasCategories(conditionList)) {
    const filteredNewsData = await filterNewsDataByCategory(newsData, searchCondition);
    newsData = filteredNewsData[0];
  }

  if (hasAnnouncerGender(conditionList)) {
    const filteredNewsData = filterNewsDataByAnnouncerGender(newsData, searchCondition);
    // TODO: wrapping newsData with first collection so that avoiding any mistakes
    newsData = filteredNewsData[0];
  }

  // TODO: wrapping newsData with first collection so that avoiding any mistakes
  newsData = sortByDateAndTitle([newsData]);
  newsData = paginateWithOffsetAndLimit(searchCondition, newsData);
  let newsDataReturn: NewsReturnDTO[] = [];
  for (let i in newsData) {
    let news = new NewsReturnDTO(newsData[i]);
    newsDataReturn.push(news);
  }
  return [newsDataReturn, totalCount];
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
  return newsDataReturn.slice(0, recommendCount)
};

const findNewsDetail = async (newsId: number): Promise<NewsScriptReturnDTO> => {
  const newsRepository = await getConnectionToMySql();
  let newsData: NewsInfo = await newsRepository.findNewsDetail(newsId);
  let newsScriptData = new NewsScriptReturnDTO(newsData);
  newsScriptData['scripts'] = newsData['scripts'];
  let scriptList: ScriptReturnDto[] = [];
  for (let i in newsData['scripts']) {
    let script = new ScriptReturnDto(newsData['scripts'][i]);
    console.log(script);
    scriptList.push(script)
  }
  newsScriptData['scripts'] = scriptList;
  return newsScriptData;
};

const searchByNewsId = async (newsId: string) => {
  const newsRepository = await getConnectionToMySql();
  return await newsRepository.findByNewsId(newsId);
};


export default {
  searchAllNews,
  searchByCategory,
  searchByChannel,
  searchByGender,
  searchByConditions,
  searchRecommendNews,
  findNewsDetail,
  searchByNewsId
};
