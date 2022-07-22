import {User} from "../../User/User";
import {Highlight} from "../Highlight";

export class CreateHighlight {
    constructor(
        _accessToken: string,
        _kakaoId: string,
        _scriptId: number,
        _startingIndex: number,
        _endingIndex: number,
    ) {
        this.accessToken = _accessToken;
        this.kakaoId = _kakaoId;
        this.scriptId = _scriptId;
        this.startingIndex = _startingIndex;
        this.endingIndex = _endingIndex;
    }

    accessToken: string;
    kakaoId: string;
    scriptId: number;
    startingIndex: number;
    endingIndex: number;

    toEntity(user: User): Highlight {
        return new Highlight(user, this.scriptId, this.startingIndex, this.endingIndex);
    }
}