import {IsDefined, IsNotEmpty} from "class-validator";

export class RemoveExistingMemoDTO {
    constructor(_accessToken: string, _kakaoId: string, _highlightId: number) {
        this.accessToken = _accessToken;
        this.kakaoId = _kakaoId;
        this.highlightId = _highlightId;
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
}