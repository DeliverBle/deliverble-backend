import { getConnection } from 'typeorm';
import { NewsRepository } from '../repository/NewsRepository';
import { NewsInfo, SearchCondition } from '../types';

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

export default {
  searchByCategory,
  searchByChannel,
  searchByGender,
};
