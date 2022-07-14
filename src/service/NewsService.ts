import { getConnection } from 'typeorm';
import { NewsQueryRepository } from '../repository/NewsRepository';
import { sortByDateAndTitle } from '../shared/common/utils';
import {
  ConditionList,
  hasAnnouncerGender,
  hasCategories,
  hasChannels,
  hasFindAll,
  NewsInfo,
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

const validateNewsDataLength = (offset: number, newsData: News[]) => {
  if (offset > newsData.length) {
    throw new Error(message.EXCEED_PAGE_INDEX);
  }
};

const paginateWithOffsetAndLimit = (searchCondition: SearchCondition, newsData: News[]) => {
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
  totalCount = newsData.length;

  newsData = paginateWithOffsetAndLimit(searchCondition, newsData)
  return [newsData, totalCount];
};

const searchRecommendNews = async () => {
  const recommendCount: number = 8;
  const newsRepository = await getConnectionToMySql();
  let newsData = await newsRepository.findRecommendNews();
  newsData = sortByDateAndTitle([newsData]);
  return newsData.slice(0,recommendCount)
};

const findNewsDetail = async () => {
  let newsId: number = 1;
  const newsRepository = await getConnectionToMySql();
  let newsData = await newsRepository.findNewsDetail(newsId);
  return newsData
};

export default {
  searchAllNews,
  searchByCategory,
  searchByChannel,
  searchByGender,
  searchByConditions,
  searchRecommendNews,
  findNewsDetail,
};
