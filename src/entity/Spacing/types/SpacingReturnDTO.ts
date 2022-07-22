import {Spacing} from "../Spacing";

export class SpacingReturnDTO {
    constructor(spacing: Spacing) {
        this.spacingId = spacing.id;
        this.scriptId = spacing.scriptId;
        this.index = spacing.index;
    }

    spacingId: number;
    scriptId: number;
    index: number;
}