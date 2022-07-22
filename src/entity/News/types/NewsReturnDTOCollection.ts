import {NewsInfo} from "./newsInfo";
import {NewsReturnDTO} from "./newsReturnDTO";
import {TagOfNewsReturnDtoCollection} from "../../Tag/types/TagOfNewsReturnDtoCollection";

export class NewsReturnDTOCollection {
    constructor(newsInfoList: NewsInfo[], favoriteNewsTagList: TagOfNewsReturnDtoCollection) {
        this.newsInfoList = newsInfoList;
        this.favoriteNewsTagList = favoriteNewsTagList;
    }

    newsInfoList: NewsInfo[] | [];
    favoriteNewsTagList: TagOfNewsReturnDtoCollection | [];

    toNewsReturnDTOList(): NewsReturnDTO[] {
        return this.newsInfoList.map((acc: NewsInfo, cur, idx) => {
            const nowReturnNewsDto = new NewsReturnDTO(acc);

            if (this.favoriteNewsTagList instanceof TagOfNewsReturnDtoCollection) {
                const nowTagOfEachNewsDto = this.favoriteNewsTagList.getCollectionById(cur).getTags();
                nowReturnNewsDto.setTag(nowTagOfEachNewsDto);
            }
            return nowReturnNewsDto;
        });
    }
}