import {SpacingReturnDTO} from "./SpacingReturnDTO";

export class SpacingReturnCollectionDTO {
    constructor(_spacingReturnCollection: SpacingReturnDTO[]) {
        this.spacingReturnCollection = _spacingReturnCollection;
        this.sortByScriptIdFirstAndIndexWhenScriptIdEquals();
    }

    spacingReturnCollection: SpacingReturnDTO[];

    sortByScriptIdFirstAndIndexWhenScriptIdEquals(): SpacingReturnCollectionDTO {
        this.spacingReturnCollection = this.spacingReturnCollection.sort((a, b) => {
            if (a.scriptId === b.scriptId) {
                return a.index - b.index;
            }
            return a.scriptId - b.scriptId;
        });
        return this;
    }
}