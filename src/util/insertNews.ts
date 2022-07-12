import { createConnection, getConnection } from "typeorm";
import { News } from "../entity/News";
import { Tag } from "../entity/Tag";
import { NewsRepository } from "../repository/NewsRepository";
import { Category } from "../shared/common/Category";
import { Channel } from "../shared/common/Channel";
import { Gender } from "../shared/common/Gender";
import { Suitability } from "../shared/common/Suitability";
import { Time } from "../vo/Time";

// news 생성하고 포트 열기
let tagTest1 = new Tag();
tagTest1.name = '북한';
let tagTest2 = new Tag();
tagTest2.name = '환경';
let tagTest3 = new Tag();
tagTest3.name = '임진강';

export const insertNewsData = async () => {
    createConnection().then(async (connection) => {
    //삭제 ^^
    // const newsRepository = News.getRepository();
    // newsRepository.delete({ id: 193});
    
    const newsRepository = News.getRepository();
    const tagRepository = Tag.getRepository();
    let tag1 = tagRepository.create(tagTest1);
    let tag2 = tagRepository.create(tagTest2);
    let tag3 = tagRepository.create(tagTest3);
    tagRepository.save(tag1);
    tagRepository.save(tag2);
    tagRepository.save(tag2);

    const newsInfo = {
        title: '북, 최근 임진강 상류 황강댐 수문 개방',
        category: Category.SOCIETY,
        tags: [tag1, tag2, tag3],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: 'https://youtu.be/ee-0DeY21rU',
        startTime: new Time(0, 0),
        endTime: new Time(36, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-30'),
    };
    const news = newsRepository.create(newsInfo);
    const news2 = await newsRepository.save(news);
    const news3 = await newsRepository.find({
        relations: ['tags'],
        where: {
        id: news2.id,
        },
    });
    console.log('>>>>>>>>>', news3);
    
    });
};
