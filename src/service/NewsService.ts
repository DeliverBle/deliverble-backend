import { getConnection } from 'typeorm';
import { NewsRepository } from '../repository/NewsRepository';
import { sortByDateAndTitle } from '../shared/common/utils';
import { ConditionList, hasChannels, hasFindAll, NewsInfo, SearchCondition } from '../types';
import { CHANNEL } from '../shared/common/Name';
import { News } from '../entity/News';

const getConnectionToMySql = async() => {
  const connection = getConnection();
  const newsRepository = connection.getCustomRepository(NewsRepository);
  return newsRepository;
}
const searchAllNews = async () => {
  const newsRepository = await getConnectionToMySql();
  return await newsRepository.find();
};

const searchByChannel = async (searchCondition: SearchCondition) => {
  const newsRepository = await getConnectionToMySql();
  return await newsRepository.findByChannels(searchCondition.channels);
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
): Promise<News[]> => {
  const newsRepository = await getConnectionToMySql();

  if (hasFindAll(conditionList)) {
    return await newsRepository.findAllNews();
  }
  if (hasChannels(conditionList)) {
    return await newsRepository.findByChannels(searchCondition.channels);
  }
  return await newsRepository.findAllNews();
};

const searchByConditions = async (
  conditionList: ConditionList,
  searchCondition: SearchCondition,
): Promise<NewsInfo[]> | null => {
  let newsData = await fetchByChannel(conditionList, searchCondition);
  // if (conditionList['channels']) {
  //   newsData = await newsRepository.findByChannels(searchCondition.channels);
  // } else {
  //   newsData = await newsRepository.findAllNews();
  // }

  if (conditionList['categories']) {
    newsData = newsData.filter((news) => {
      if (searchCondition.categories.includes(news.category)) {
        return news;
      }
    });
  }

  if (conditionList['announcerGender']) {
    newsData = newsData.filter((news) => {
      if (news.announcerGender === searchCondition.announcerGender) {
        return news;
      }
    });
  }

  newsData = sortByDateAndTitle(newsData);

  return newsData;
};

export default {
  searchAllNews,
  searchByCategory,
  searchByChannel,
  searchByGender,
  searchByConditions,
};
