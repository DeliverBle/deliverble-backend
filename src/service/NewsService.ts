import { getConnection, getCustomRepository } from "typeorm";
import { News } from "../entity/News";
import { NewsRepository } from "../repository/NewsRepository";
import { NewsInfo, SearchCondition } from "../types"

const searchNews = async (searchCondition: SearchCondition): Promise<NewsInfo[]> => {
    try {

        // 1. channel이 searchCondition 속하는 모든 News 조회
        // const connection = getConnection();
        // const newsRepository = connection.getCustomRepository(NewsRepository);
        // const data = await newsRepository.findByChannels(searchCondition.channels);
        // return data;

        // 2. category가 searchCondition에 속하는 모든 News 조회
        // const connection = getConnection();
        // const newsRepository = connection.getCustomRepository(NewsRepository);
        // const data = await newsRepository.findByCategories(searchCondition.categories);
        // return data;

        // 3. announcerGender가 searchCondition에 속하는 모든 News 조회
        const connection = getConnection();
        const newsRepository = connection.getCustomRepository(NewsRepository);
        const data = await newsRepository.findByAnnouncerGender(searchCondition.announcerGender);
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    searchNews,
}
