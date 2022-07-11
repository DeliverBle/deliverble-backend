import { SearchCondition } from "../../types";

export const sortNewsData = (newsData) => {
    newsData.sort((prev, next) => {
        // if ((+ new Date(next.reportDate)) - (+ new Date(prev.reportDate)) == 0) {
        //     return (+ new Date(next.reportDate)) - (+ new Date(prev.reportDate));
        // }
        return (+ new Date(next.reportDate)) - (+ new Date(prev.reportDate));
      })
    return newsData;
}





export const validateConditions = (searchCondition: SearchCondition): object | boolean => {
    let conditionList: object = {
        channels: false,
        categories: false,
        announcerGender: false,
    };
    if (searchCondition.channels !== undefined) {
        conditionList['channels'] = true;
    } 

    if (searchCondition.categories !== undefined) {
        conditionList['categories'] = true;
    } 

    if (searchCondition.announcerGender !== undefined) {
        conditionList['announcerGender'] = true;
    } 

    if (!(conditionList['channels'] | conditionList['categories'] | conditionList['announcerGender'])) {
        return false;
    }

    return conditionList;

}
