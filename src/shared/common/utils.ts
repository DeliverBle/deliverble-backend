import { SearchCondition } from "../../types";



export const validateConditions = (searchCondition: SearchCondition): object | boolean => {
    let conditionList: object = {
        channels: false,
        categories: false,
        announcerGender: false,
    };
    if (searchCondition.channels !== undefined) {
        conditionList['channels'] = true;
    } else {
        conditionList['channels'] = false;
    }

    if (searchCondition.categories !== undefined) {
        conditionList['categories'] = true;
    } else {
        conditionList['categories'] = false;
    }

    if (searchCondition.announcerGender !== undefined) {
        conditionList['announcerGender'] = true;
    } else {
        conditionList['announcerGender'] = false;
    }

    if (!(conditionList['channels'] | conditionList['categories'] | conditionList['announcerGender'])) {
        return false;
    }

    return conditionList;

}
