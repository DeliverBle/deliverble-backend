import {Category} from "../../../shared/common/Category";
import {Tag} from "../../Tag/Tag";
import {Gender} from "../../../shared/common/Gender";
import {Channel} from "../../../shared/common/Channel";
import {Time} from "../../../vo/Time";
import {Suitability} from "../../../shared/common/Suitability";

export interface NewsInfo {
    id: number;
    title: string;
    category: Category;
    tags: Tag[];
    announcerGender: Gender;
    channel: Channel;
    link: string;
    thumbnail: string;
    startTime: Time;
    endTime: Time;
    suitability: Suitability;
    isEmbeddable: boolean;
    reportDate: Date;
}