import {TagOfEachNewsReturnDto} from "./TagOfEachNewsReturnDto";

export class TagOfNewsReturnDtoCollection {
    constructor(_tagOfNewsReturnDtoCollection: TagOfEachNewsReturnDto[]) {
        this.tagDataOfEachNewsCollection = _tagOfNewsReturnDtoCollection;
    }

    tagDataOfEachNewsCollection: TagOfEachNewsReturnDto[];

    getCollectionById(id: number): TagOfEachNewsReturnDto {
        return this.tagDataOfEachNewsCollection[id];
    }
}