import {Highlight} from "../Highlight";
import {createMemoArrayWrappedObject, MemoReturnDto} from "../../../vo/MemoArrayWrappedObject";

export class HighlightReturnDTO {
    constructor(highlight: Highlight) {
        this.scriptId = highlight.scriptId;
        this.highlightId = highlight.id;
        this.startingIndex = highlight.startingIndex;
        this.endingIndex = highlight.endingIndex;
    }

    scriptId: number;
    startingIndex: number;
    endingIndex: number;
    highlightId: number;
    memo: MemoReturnDto;

    static async createHighlightReturnDTOWithMemo(highlight: Highlight): Promise<HighlightReturnDTO> {
        const newHighlight = new HighlightReturnDTO(highlight);
        const toReturnMemo = await highlight.getMemo();
        const toWrappedMemo = createMemoArrayWrappedObject(await highlight.getMemo());
        newHighlight.memo = toWrappedMemo;
        return newHighlight;
    }
}