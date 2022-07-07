import { getConnection, getCustomRepository } from "typeorm";
import { News } from "../entity/News";
import { NewsRepository } from "../repository/NewsRepository";
import { NewsInfo, SearchCondition } from "../types"

const searchNews = async (searchCondition: SearchCondition): Promise<NewsInfo> => {
    try {

        // News 전체 조회
        // const newsRepository = News.getRepository();
        // const data = newsRepository.find();

        // id 일치하는 뉴스 1개 조회 (repository로 db 접근 로직 분리)
        const connection = getConnection();
        const newsRepository = connection.getCustomRepository(NewsRepository);
        const data = await newsRepository.findById(5);

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    searchNews,
}
