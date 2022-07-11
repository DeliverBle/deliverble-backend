import { getConnection } from 'typeorm';
import { NewsRepository } from '../repository/NewsRepository';
import { sortByDate, sortByDateAndTitle, sortByTitle } from '../shared/common/utils';
import { NewsInfo, SearchCondition } from '../types';


const searchAllNews = async () => {
    const connection = getConnection();
    const newsRepository = connection.getCustomRepository(NewsRepository);
    return await newsRepository.find();
  };

const searchByChannel = async (searchCondition: SearchCondition) => {
  const connection = getConnection();
  const newsRepository = connection.getCustomRepository(NewsRepository);
  return await newsRepository.findByChannels(searchCondition.channels);
};

const searchByCategory = async (searchCondition: SearchCondition) => {
  const connection = getConnection();
  const newsRepository = connection.getCustomRepository(NewsRepository);
  return await newsRepository.findByCategories(searchCondition.categories);
};

const searchByGender = async (searchCondition: SearchCondition): Promise<NewsInfo[]> => {
  try {
    const connection = getConnection();
    const newsRepository = connection.getCustomRepository(NewsRepository);
    return await newsRepository.findByAnnouncerGender(searchCondition.announcerGender);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const searchByConditions = async (conditionList: object | boolean, searchCondition: SearchCondition): Promise<NewsInfo[]> | null=> {
  const connection = getConnection();
  const newsRepository = connection.getCustomRepository(NewsRepository);
  let newsData;
  if (conditionList['channels']) {
    newsData = await newsRepository.findByChannels(searchCondition.channels);
  } else {
    newsData = await newsRepository.findAllNews();
  }
  
  if (conditionList['categories']) {
    newsData = newsData.filter((news) => {
      if (searchCondition.categories.includes(news.category)) {
        return news;
      }
    })
  }

  if (conditionList['announcerGender']) {
    newsData = newsData.filter((news) => {
      if (news.announcerGender === searchCondition.announcerGender) {
        return news;
      }
    })
  }

  newsData = sortByDateAndTitle(newsData);

  return newsData;
}

export default {
  searchAllNews,
  searchByCategory,
  searchByChannel,
  searchByGender,
  searchByConditions,
};
