import {Tag} from "../Tag";

export class TagOfEachNewsReturnDto {
    constructor(tags: Tag[]) {
        this.tags = tags;
    }

    tags: Tag[];

    getTags(): Tag[] {
        return this.tags;
    }
}