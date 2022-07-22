import {convertKoreanToGenderObject} from "../../shared/common/Gender";

export class SearchCondition {
    constructor(_channels, _categories, _announcerGender, _currentPage, _listSize) {
        this.channels = _channels ? _channels : [];
        this.categories = _categories;
        this.announcerGender = convertKoreanToGenderObject(_announcerGender);
        this.currentPage = _currentPage;
        this.listSize = _listSize;
    }

    // ["남자"] --> ["male"]
    channels: string[];
    categories: string[];
    announcerGender: string[];
    currentPage: number | 1;
    listSize: number | 12;

    getOffset(): number {
        return (this.currentPage - 1) * this.listSize;
    }

    getLimit(): number {
        return this.listSize;
    }
}