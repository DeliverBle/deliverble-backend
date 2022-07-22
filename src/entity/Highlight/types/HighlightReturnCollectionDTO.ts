import {HighlightReturnDTO} from "./HighlightReturnDTO";

export class HighlightReturnCollectionDTO {
    static createCollection(_highlightReturnCollection: HighlightReturnDTO[]) {
        return new HighlightReturnCollectionDTO(_highlightReturnCollection);
    }

    constructor(_highlightReturnCollection: HighlightReturnDTO[]) {
        this.highlightReturnCollection = _highlightReturnCollection;
        this.sortByScriptIdFirstAndStartingIndexWhenScriptIdEquals();
    }

    highlightReturnCollection: HighlightReturnDTO[];

    sortByScriptIdFirstAndStartingIndexWhenScriptIdEquals(): HighlightReturnCollectionDTO {
        this.highlightReturnCollection = this.highlightReturnCollection.sort((a, b) => {
            if (a.scriptId === b.scriptId) {
                return a.startingIndex - b.startingIndex;
            }
            return a.scriptId - b.scriptId;
        });
        return this;
    }
}