export class RemoveSpacing {
    constructor(
        _accessToken: string,
        _kakaoId: string,
        _newsId: number,
        _spacingId: number,
    ) {
        this.accessToken = _accessToken;
        this.kakaoId = _kakaoId;
        this.newsId = _newsId;
        this.spacingId = _spacingId;
    }

    accessToken: string;
    kakaoId: string;
    newsId: number;
    spacingId: number;
}