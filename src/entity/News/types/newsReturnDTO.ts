import {NewsInfo} from "./newsInfo";
import {convertGenderEnglishToKorean} from "../../../shared/common/Gender";
import {Time} from "../../../vo/Time";
import {Category} from "../../../shared/common/Category";
import {Channel} from "../../../shared/common/Channel";
import {Suitability} from "../../../shared/common/Suitability";
import {Tag} from "../../Tag/Tag";

export class NewsReturnDTO {
    constructor(newsInfo: NewsInfo) {
        this.id = newsInfo.id;
        this.title = newsInfo.title;
        this.category = newsInfo.category;
        this.announcerGender = convertGenderEnglishToKorean(newsInfo.announcerGender);
        this.channel = newsInfo.channel;
        this.link = newsInfo.link;
        this.thumbnail = newsInfo.thumbnail;
        this.startTime = Time.toNumber(newsInfo.startTime);
        this.endTime = Time.toNumber(newsInfo.endTime);
        this.suitability = newsInfo.suitability;
        this.isEmbeddable = newsInfo.isEmbeddable;
        this.reportDate = newsInfo.reportDate;
        this.tags = newsInfo.tags;
    }

    id: number;
    title: string;
    category: Category;
    announcerGender: string;
    channel: Channel;
    link: string;
    thumbnail: string;
    suitability: Suitability;
    isEmbeddable: boolean;
    reportDate: Date;
    startTime: number;
    endTime: number;
    tags: Tag[];

    setTag(tagOfEachNewsReturnDto: Tag[]) {
        this.tags = tagOfEachNewsReturnDto;
    }
}