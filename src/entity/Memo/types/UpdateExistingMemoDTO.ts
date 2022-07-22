import {IsDefined, IsNotEmpty} from "class-validator";
import {Memo} from "../Memo";

export class UpdateExistingMemoDTO {
    constructor(
        _accessToken: string,
        _kakaoId: string,
        _highlightId: number,
        _keyword: string,
        _content: string,
    ) {
        this.accessToken = _accessToken;
        this.kakaoId = _kakaoId;
        this.highlightId = _highlightId;
        this.keyword = _keyword;
        this.content = _content;
    }

    @IsNotEmpty()
    @IsDefined()
    accessToken: string;

    @IsNotEmpty()
    @IsDefined()
    kakaoId: string;

    @IsNotEmpty()
    @IsDefined()
    highlightId: number;

    @IsNotEmpty()
    @IsDefined()
    keyword: string;

    @IsNotEmpty()
    @IsDefined()
    content: string;

    toEntity(): Memo {
        return new Memo(this.keyword, this.content);
    }
}