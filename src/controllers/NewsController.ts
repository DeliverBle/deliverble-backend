import express, { Request, Response } from 'express';
import NewsService from '../service/NewsService';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { PaginationInfo, SearchCondition } from '../types';
import { validateConditions } from '../shared/common/utils';

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
  const searchCondition: SearchCondition = new SearchCondition(
    channels,
    categories,
    announcerGender,
    currentPage,
    listSize,
  );

  let conditionList = validateConditions(searchCondition);
  console.log(conditionList);

  let data;
  let paginationInfo: PaginationInfo;

  try {
    if (conditionList) {
      [data, paginationInfo] = await NewsService.searchByConditions(conditionList, searchCondition);
    } else {
      [data, paginationInfo] = await NewsService.searchAllNews();
    }

    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.SEARCH_NEWS_SUCCESS, data, paginationInfo));
  } catch (error) {
    console.log(error);
    if (error.message === message.EXCEED_PAGE_INDEX) {
      res
        .status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, message.EXCEED_PAGE_INDEX));
    }
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @route post / recommend
 * @description Find news recommended by PM
 * @access Public
 */
const recommendNews = async (req: Request, res: Response): Promise<void | Response> => {
  
  let data;

  try {
    data = await NewsService.searchRecommendNews();
        res
          .status(statusCode.OK)
          .send(util.success(statusCode.OK, message.RECOMMEND_NEWS_SUCCESS, data));
    }
  catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const newsDetail = async (req: Request, res: Response): Promise<void | Response> => {
  let newsId = Number(req.params.newsId);
  let data;

  try {
    data = await NewsService.findNewsDetail(newsId);
        res
          .status(statusCode.OK)
          .send(util.success(statusCode.OK, message.DETAIL_NEWS_SUCCESS, data));
    }
  catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  searchNews,
  recommendNews,
  newsDetail,
};
