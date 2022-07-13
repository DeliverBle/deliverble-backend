import { ConditionList, SearchCondition } from '../../types';

const sortByDateAndTitle = (newsData) => {
  console.log(">>>>>>>> newsData", newsData[0])
  let nowFilteringNewsData = newsData[0]
  nowFilteringNewsData.sort((prev, next) => {
    if (+new Date(prev.reportDate) == +new Date(next.reportDate)) {
      const condition = '[]{}*!@_.()#^&%-=+01234567989abcdefghijklmnopqrstuvwxyz';
      let prev_condition = condition.indexOf(prev.title[0]);
      let next_condition = condition.indexOf(next.title[0]);

      if (prev_condition === next_condition) {
        return prev.title < next.title ? -1 : prev.title > next.title ? 1 : 0;
      }
      return prev_condition - next_condition;
    }

    return +new Date(next.reportDate) - +new Date(prev.reportDate);
  });
  console.log(">>>>>>>>>>  Yes After newsData", nowFilteringNewsData)

  return nowFilteringNewsData;
};

const validateConditions = (searchCondition: SearchCondition): ConditionList => {
  let conditionList: ConditionList = {
    channels: false,
    categories: false,
    announcerGender: false,
    findAll: false,
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
    conditionList['findAll'] = true;
  }

  return conditionList;
};

export { sortByDateAndTitle, validateConditions };
