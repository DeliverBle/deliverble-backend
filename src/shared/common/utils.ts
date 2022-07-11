import { ConditionList, SearchCondition } from '../../types';

const sortByDate = (newsData) => {
  newsData.sort((prev, next) => {
    if (+new Date(next.reportDate) === +new Date(prev.reportDate)) {
    }
    return +new Date(next.reportDate) - +new Date(prev.reportDate);
  });
  return newsData;
};

const sortByTitle = (newsData) => {
  // 한글 우선 오름차순
  const sortByHangeulInAsc = newsData.sort((prev, next) => {
    return prev.title < next.title ? -1 : prev.title > next.title ? 1 : 0;
  });
  return sortByHangeulInAsc;
};

const sortByDateAndTitle = (newsData) => {
  newsData.sort((prev, next) => {
    if (+new Date(prev.reportDate) == +new Date(next.reportDate)) {
      const condition = '[]{}*!@_.()#^&%-=+01234567989abcdefghijklmnopqrstuvwxyz';
      let prev_condition = condition.indexOf(prev.title[0]);
      let next_condition = condition.indexOf(next.title[0]);

      if (prev_condition === next_condition) {
        if (prev.title < next.title) {
          return -1;
        }
        if (prev.title > next.title) {
          return 1;
        }
        return 0;
      }
      return prev_condition - next_condition;
    }
    return +new Date(next.reportDate) - +new Date(prev.reportDate);
  });
  return newsData;
};

const validateConditions = (searchCondition: SearchCondition): ConditionList | boolean => {
  let conditionList: ConditionList = {
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

  if (
    !(conditionList['channels'] || conditionList['categories'] || conditionList['announcerGender'])
  ) {
    return false;
  }

  return conditionList;
};

export { sortByDate, sortByTitle, sortByDateAndTitle, validateConditions };
