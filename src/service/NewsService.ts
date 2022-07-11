import { getConnection } from 'typeorm';
import { NewsRepository } from '../repository/NewsRepository';
import { sortByDate, sortByDateAndTitle, sortByTitle } from '../shared/common/utils';
import { ConditionList, hasChannels, hasFindAll, NewsInfo, SearchCondition } from '../types';
import { CHANNEL } from '../shared/common/Name';
import { News } from '../entity/News';

const connection = getConnection();
const newsRepository = connection.getCustomRepository(NewsRepository);

const searchAllNews = async () => {
  return await newsRepository.find();
};

const searchByChannel = async (searchCondition: SearchCondition) => {
  return await newsRepository.findByChannels(searchCondition.channels);
};

const searchByCategory = async (searchCondition: SearchCondition) => {
  return await newsRepository.findByCategories(searchCondition.categories);
};

const searchByGender = async (searchCondition: SearchCondition): Promise<NewsInfo[]> => {
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
