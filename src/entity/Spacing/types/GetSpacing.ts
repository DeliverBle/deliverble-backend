export class GetSpacing {
    constructor(
        _accessToken: string,
        _kakaoId: string,
        _newsId: number,
    ) {
        this.accessToken = _accessToken;
        this.kakaoId = _kakaoId;
        this.newsId = _newsId;
    }

    accessToken: string;
    kakaoId: string;
    newsId: number;
}