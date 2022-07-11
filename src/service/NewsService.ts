import { getConnection } from 'typeorm';
import { NewsRepository } from '../repository/NewsRepository';
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
  // console.log(newsData);

  
   if (conditionList['categories']) {
    newsData = newsData.filter((news) => {
      if (searchCondition.categories.includes(news.category)) {
        return news;
      }
    })
  }
  // console.log(newsData);

  if (conditionList['announcerGender']) {
    newsData = newsData.filter((news) => {
      if (news.announcerGender === searchCondition.announcerGender) {
        return news;
      }
    })
  }
  console.log(newsData);

  return newsData;
}

  // console.log("healthNewsList", healthNewsList);
  
  // let result: NewsInfo[];
  // for (let i in newsData) {
    
  //   console.log(`console in for : ${newsData[i]}`);
  //   if (!(searchCondition.categories.indexOf(newsData[i].category) < 0)) {
  //     console.log(searchCondition.categories.indexOf(newsData[i].category));
  //     console.log(typeof newsData[i]);
  //     // result.push(newsData[i]);  object Object
  //   }
  // }
// 
//   return newsData;
// 
// };


export default {
  searchAllNews,
  searchByCategory,
  searchByChannel,
  searchByGender,
  searchByConditions,
};
