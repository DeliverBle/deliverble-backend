import {NewsInfo} from "../../News/types/newsInfo";
import {NewsReturnDTO} from "../../News/types/newsReturnDTO";

export interface UserFavoriteNewsReturnDTO {
    readonly kakaoId: string;
    // EAGER LOADING | LAZY LOADING
    readonly favoriteNews: NewsInfo[] | Promise<NewsInfo[]> | NewsReturnDTO[];
}