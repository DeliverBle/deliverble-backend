import express, { Request, Response } from 'express';
import NewsService from '../service/NewsService';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { SearchCondition } from '../types';
import { validateConditions } from '../shared/common/utils'

/**
 * @route get /search
 * @description Search for news based on conditions
 * @access Public
 */
const searchNews = async (req: Request, res: Response): Promise<void | Response> => {
  const channels = req.body.channels;
  const categories = req.body.categories;
  const announcerGender = req.body.announcerGender;
  const currentPage = req.body.currentPage;
  const listSize = req.body.listSize;
  const searchCondition: SearchCondition = new SearchCondition(channels, categories, announcerGender, currentPage, listSize)

  let data;
  let conditionList = validateConditions(searchCondition);
  console.log(conditionList);

  try {
    if (conditionList) {
      data = await NewsService.searchByConditions(conditionList, searchCondition)
    } else {
      data = await NewsService.searchAllNews();
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.SEARCH_NEWS_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  searchNews,
};
