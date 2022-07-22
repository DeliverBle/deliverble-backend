import {User} from "../../User/User";
import {Spacing} from "../Spacing";

export class CreateSpacing {
    constructor(
        _accessToken: string,
        _kakaoId: string,
        _scriptId: number,
        _newsId: number,
        _index: number
    ) {
        this.accessToken = _accessToken;
        this.kakaoId = _kakaoId;
        this.scriptId = _scriptId;
        this.newsId = _newsId;
        this.index = _index;
    }

    accessToken: string;
    kakaoId: string;
    scriptId: number;
    newsId: number;
    index: number;

    toEntity(user: User): Spacing {
        return new Spacing(user, this.scriptId, this.index);
    }
}