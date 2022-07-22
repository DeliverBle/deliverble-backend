export class UpdatedAccessTokenDTO {
    static NONE_TOKEN = 'NONE';

    constructor(
        _access_token: string,
        _expires_in: string,
        _refresh_token: string | undefined,
        _refresh_token_expires_in: string | undefined,
    ) {
        this.access_token = _access_token;
        this.expires_in = _expires_in;
        this.refresh_token = !_refresh_token ? UpdatedAccessTokenDTO.NONE_TOKEN : _refresh_token;
        this.refresh_token_expires_in = !_refresh_token_expires_in
            ? UpdatedAccessTokenDTO.NONE_TOKEN
            : _refresh_token_expires_in;
    }

    access_token: string;
    expires_in: string;
    // TODO: NONE이면 반환하지 않는 방법 고민해보기
    refresh_token?: string;
    refresh_token_expires_in?: string;

    doesRetrievedAccessOrRefreshTokenExist(): boolean {
        return (
            this.access_token !== UpdatedAccessTokenDTO.NONE_TOKEN ||
            this.refresh_token !== UpdatedAccessTokenDTO.NONE_TOKEN
        );
    }
}