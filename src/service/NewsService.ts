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
): Promise<[News[], number]> => {
  const newsRepository = await getConnectionToMySql();

  if (hasFindAll(conditionList)) {
    return await newsRepository.findAllNews(searchCondition);
  }
  if (hasChannels(conditionList)) {
    return await newsRepository.findByChannels(searchCondition);
  }
  return await newsRepository.findAllNews(searchCondition);
};

const filterNewsDataByCategory = (newsData: News[], searchCondition: SearchCondition) => {
  return newsData.filter((news) => {
    if (searchCondition.categories.includes(news.category)) {
      return news;
    }
  });
};

const filterNewsDataByAnnouncerGender = (newsData: News[], searchCondition: SearchCondition) => {
  return newsData.filter((news) => {
    if (news.announcerGender === searchCondition.announcerGender) {
      return news;
    }
  });
};

const searchByConditions = async (
  conditionList: ConditionList,
  searchCondition: SearchCondition,
): Promise<[NewsInfo[], number]> | null => {
  let [newsData, pageSize] = await fetchByChannel(conditionList, searchCondition);

  if (hasCategories(conditionList)) {
    newsData = filterNewsDataByCategory(newsData, searchCondition);
  }

  if (hasAnnouncerGender(conditionList)) {
    newsData = filterNewsDataByAnnouncerGender(newsData, searchCondition);
  }

  newsData = sortByDateAndTitle(newsData);

  return [newsData, pageSize];
};

export default {
  searchAllNews,
  searchByCategory,
  searchByChannel,
  searchByGender,
  searchByConditions,
};
