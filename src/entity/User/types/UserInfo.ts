import {User} from "../User";
import {IsNotEmpty} from "class-validator";
import {NewsInfo} from "../../News/types/newsInfo";

export class UserInfo {
    constructor(user: User) {
        this.kakaoId = user.kakaoId;
        this.nickname = user.nickname;
        this.email = user.email;
        this.gender = user.gender;
    }

    @IsNotEmpty()
    kakaoId: string;
    nickname: string;
    email: string;
    gender: string;
    favoriteNews?: NewsInfo[] | Promise<NewsInfo[]>;

    addFavoriteNewsAfterPromiseResolved(_favoriteNews: NewsInfo[] | Promise<NewsInfo[]>) {
        this.favoriteNews = _favoriteNews;
        return this.favoriteNews;
    }
}