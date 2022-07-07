import express, { Request, Response } from "express";
import NewsService from "../service/NewsService";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";

/**
 * @route get /search
 * @description Search for news based on conditions
 * @access Public
 */
const searchNews = async (req: Request, res: Response): Promise<void | Response> => {
    const searchCondition = req.body;
    
    try {
        console.log(Object.keys(req));
        console.log(req.body)
        console.log(typeof req.body.channel)
        console.log(req.body.channel[0])
        const data = await NewsService.searchNews(searchCondition);
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.SEARCH_NEWS_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    searchNews,
}
