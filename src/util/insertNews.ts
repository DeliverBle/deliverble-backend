import { createConnection, getConnection, QueryRunner } from 'typeorm';
import { News } from '../entity/News';
import { Tag } from '../entity/Tag';
import { Category } from '../shared/common/Category';
import { Channel } from '../shared/common/Channel';
import { Gender } from '../shared/common/Gender';
import { Suitability } from '../shared/common/Suitability';
import { NewsInfo } from '../types';
import { Time } from '../vo/Time';

// 추천 태그 생성
let tagTestRecommend = new Tag();
tagTestRecommend.name = '딜리버블 추천';

// 뉴스 별 태그 생성
let tagTest1_1 = new Tag();
tagTest1_1.name = '경제';
let tagTest1_2 = new Tag();
tagTest1_2.name = '비트코인';
let tagTest1_3 = new Tag();
tagTest1_3.name = '폭락';

let tagTest2_1 = new Tag();
tagTest2_1.name = '북한';
let tagTest2_2 = new Tag();
tagTest2_2.name = '환경';
let tagTest2_3 = new Tag();
tagTest2_3.name = '임진강';

let tagTest3_1 = new Tag();
tagTest3_1.name = '제주';
let tagTest3_2 = new Tag();
tagTest3_2.name = '예산';
let tagTest3_3 = new Tag();
tagTest3_3.name = '무상급식';

let tagTest4_1 = new Tag();
tagTest4_1.name = '범죄';
let tagTest4_2 = new Tag();
tagTest4_2.name = '사망사고';
let tagTest4_3 = new Tag();
tagTest4_3.name = '공무원';

let tagTest5_1 = new Tag();
tagTest5_1.name = '장관';
let tagTest5_2 = new Tag();
tagTest5_2.name = '인사';
let tagTest5_3 = new Tag();
tagTest5_3.name = '사퇴';

let tagTest6_1 = new Tag();
tagTest6_1.name = '영국';
let tagTest6_2 = new Tag();
tagTest6_2.name = '중국';
let tagTest6_3 = new Tag();
tagTest6_3.name = '홍콩';

let tagTest7_1 = new Tag();
tagTest7_1.name = '대선';
let tagTest7_2 = new Tag();
tagTest7_2.name = '이재명';
let tagTest7_3 = new Tag();
tagTest7_3.name = '의전논란';

let tagTest8_1 = new Tag();
tagTest8_1.name = '우크라이나';
let tagTest8_2 = new Tag();
tagTest8_2.name = '루가노선언';
let tagTest8_3 = new Tag();
tagTest8_3.name = '경제회복';

let tagTest9_1 = new Tag();
tagTest9_1.name = '원숭이두창';
let tagTest9_2 = new Tag();
tagTest9_2.name = '치료제';
let tagTest9_3 = new Tag();
tagTest9_3.name = '중대본';

let tagTest10_1 = new Tag();
tagTest10_1.name = 'WHO';
let tagTest10_2 = new Tag();
tagTest10_2.name = '원숭이두창';
let tagTest10_3 = new Tag();
tagTest10_3.name = '확산';

let tagTest11_1 = new Tag();
tagTest11_1.name = '일본';
let tagTest11_2 = new Tag();
tagTest11_2.name = '선진국';
let tagTest11_3 = new Tag();
tagTest11_3.name = '경제';

let tagTest12_1 = new Tag();
tagTest12_1.name = '서울';
let tagTest12_2 = new Tag();
tagTest12_2.name = '경찰';
let tagTest12_3 = new Tag();
tagTest12_3.name = '마약';

let tagTest13_1 = new Tag();
tagTest13_1.name = '코로나';
let tagTest13_2 = new Tag();
tagTest13_2.name = '경제';
let tagTest13_3 = new Tag();
tagTest13_3.name = '인테리어';

let tagTest14_1 = new Tag();
tagTest14_1.name = '과학';
let tagTest14_2 = new Tag();
tagTest14_2.name = '우주';
let tagTest14_3 = new Tag();
tagTest14_3.name = '누리호';

export const insertNewsData = async (connection) => {
  // await createConnection().then(async (connection) => {

    // drop tables
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    console.log("queryRunner executed")
    // console.log(">>>>>>", await queryRunner.hasTable("tag"))
    // if (await queryRunner.hasTable("tag")) {
    //   await queryRunner.dropTable("tag")
    // }
    // if (await queryRunner.hasTable("news")) {
    //   await queryRunner.dropTable("news")
    // }
    // await queryRunner.createTa
    // console.log(">>>>>>>><<<<<")
    // await queryRunner.dropTable("tag");
    // await queryRunner.dropTable("news");

    //삭제 ^^
    // const newsRepository = News.getRepository();
    // newsRepository.delete({ id: 193});

    const newsRepository = await News.getRepository();
    const tagRepository = await Tag.getRepository();

    await tagRepository.query(`set FOREIGN_KEY_CHECKS = 0`)
    await tagRepository.clear();

    await newsRepository.query(`set FOREIGN_KEY_CHECKS = 0`)
    await newsRepository.clear();

    await tagRepository.query(`set FOREIGN_KEY_CHECKS = 1`)
    await newsRepository.query(`set FOREIGN_KEY_CHECKS = 1`)
    
    // 추천 태그 객체 생성
    let tagRecommend = tagRepository.create(tagTestRecommend);
    tagRepository.save(tagRecommend);

    // 뉴스 별 태그 객체 생성
    let tag1_1 = tagRepository.create(tagTest1_1);
    let tag1_2 = tagRepository.create(tagTest1_2);
    let tag1_3 = tagRepository.create(tagTest1_3);
    
    tagRepository.save(tag1_1);
    tagRepository.save(tag1_2);
    tagRepository.save(tag1_3);

    let tag2_1 = tagRepository.create(tagTest2_1);
    let tag2_2 = tagRepository.create(tagTest2_2);
    let tag2_3 = tagRepository.create(tagTest2_3);
    tagRepository.save(tag2_1);
    tagRepository.save(tag2_2);
    tagRepository.save(tag2_3);

    let tag3_1 = tagRepository.create(tagTest3_1);
    let tag3_2 = tagRepository.create(tagTest3_2);
    let tag3_3 = tagRepository.create(tagTest3_3);
    tagRepository.save(tag3_1);
    tagRepository.save(tag3_2);
    tagRepository.save(tag3_3);

    let tag4_1 = tagRepository.create(tagTest4_1);
    let tag4_2 = tagRepository.create(tagTest4_2);
    let tag4_3 = tagRepository.create(tagTest4_3);
    tagRepository.save(tag4_1);
    tagRepository.save(tag4_2);
    tagRepository.save(tag4_3);

    let tag5_1 = tagRepository.create(tagTest5_1);
    let tag5_2 = tagRepository.create(tagTest5_2);
    let tag5_3 = tagRepository.create(tagTest5_3);
    tagRepository.save(tag5_1);
    tagRepository.save(tag5_2);
    tagRepository.save(tag5_3);

    let tag6_1 = tagRepository.create(tagTest6_1);
    let tag6_2 = tagRepository.create(tagTest6_2);
    let tag6_3 = tagRepository.create(tagTest6_3);
    tagRepository.save(tag6_1);
    tagRepository.save(tag6_2);
    tagRepository.save(tag6_3);

    let tag7_1 = tagRepository.create(tagTest7_1);
    let tag7_2 = tagRepository.create(tagTest7_2);
    let tag7_3 = tagRepository.create(tagTest7_3);
    tagRepository.save(tag7_1);
    tagRepository.save(tag7_2);
    tagRepository.save(tag7_3);

    let tag8_1 = tagRepository.create(tagTest8_1);
    let tag8_2 = tagRepository.create(tagTest8_2);
    let tag8_3 = tagRepository.create(tagTest8_3);
    tagRepository.save(tag8_1);
    tagRepository.save(tag8_2);
    tagRepository.save(tag8_3);
    
    let tag9_1 = tagRepository.create(tagTest9_1);
    let tag9_2 = tagRepository.create(tagTest9_2);
    let tag9_3 = tagRepository.create(tagTest9_3);
    tagRepository.save(tag9_1);
    tagRepository.save(tag9_2);
    tagRepository.save(tag9_3);

    let tag10_1 = tagRepository.create(tagTest10_1);
    let tag10_2 = tagRepository.create(tagTest10_2);
    let tag10_3 = tagRepository.create(tagTest10_3);
    tagRepository.save(tag10_1);
    tagRepository.save(tag10_2);
    tagRepository.save(tag10_3);

    let tag11_1 = tagRepository.create(tagTest11_1);
    let tag11_2 = tagRepository.create(tagTest11_2);
    let tag11_3 = tagRepository.create(tagTest11_3);
    tagRepository.save(tag11_1);
    tagRepository.save(tag11_2);
    tagRepository.save(tag11_3);

    let tag12_1 = tagRepository.create(tagTest12_1);
    let tag12_2 = tagRepository.create(tagTest12_2);
    let tag12_3 = tagRepository.create(tagTest12_3);
    tagRepository.save(tag12_1);
    tagRepository.save(tag12_2);
    tagRepository.save(tag12_3);

    let tag13_1 = tagRepository.create(tagTest13_1);
    let tag13_2 = tagRepository.create(tagTest13_2);
    let tag13_3 = tagRepository.create(tagTest13_3);
    tagRepository.save(tag13_1);
    tagRepository.save(tag13_2);
    tagRepository.save(tag13_3);

    let tag14_1 = tagRepository.create(tagTest14_1);
    let tag14_2 = tagRepository.create(tagTest14_2);
    let tag14_3 = tagRepository.create(tagTest14_3);
    tagRepository.save(tag14_1);
    tagRepository.save(tag14_2);
    tagRepository.save(tag14_3);

    const newsInfo = [
      {
        title: '비트코인, 한때 1만 8천 달러 붕괴',
        category: Category.ECONOMY,
        tags: [tag1_1, tag1_2, tag1_3, tagRecommend],
        // tags: ['비트코인', '붕괴', '우진'],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'S_gtbu2VRlI',
        thumbnail: 'https://img.youtube.com/vi/S_gtbu2VRlI/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(35, 4),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-19'),
      },
      {
        title: '북, 최근 임진강 상류 황강댐 수문 개방',
        category: Category.SOCIETY,
        tags: [tag2_1, tag2_2, tag2_3, tagRecommend],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: 'ee-0DeY21rU',
        thumbnail: 'https://img.youtube.com/vi/ee-0DeY21rU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(36, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-30'),
      },
      {
        title: '제주, 초중고교 무상급식 예산 46억 원 증액 ',
        category: Category.SOCIETY,
        tags: [tag3_1, tag3_2, tag3_3, tagRecommend],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: '45IAfzlB_tQ',
        thumbnail: 'https://img.youtube.com/vi/45IAfzlB_tQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(37, 80),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-06'),
      },
      {
        title: '안동시 공무원, 동료 직원 흉기에 찔려 사망',
        category: Category.SOCIETY,
        tags: [tag4_1, tag4_2, tag4_3, tagRecommend],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'sId-zbgWuZU',
        thumbnail: 'https://img.youtube.com/vi/sId-zbgWuZU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(27, 16),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-05'),
      },
      {
        title: '김승희 보건복지부 장관 후보자 자진 사퇴',
        category: Category.POLITICS,
        tags: [tag5_1, tag5_2, tag5_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'IisQfwEp8D8',
        thumbnail: 'https://img.youtube.com/vi/IisQfwEp8D8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(40, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-04'),
      },
      {
        title: '영 총리 "중, 일국양제 약속 어겨…홍콩 포기 안 할 것"',
        category: Category.WORLD,
        tags: [tag6_1, tag6_2, tag6_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'BXs223nIWWo',
        thumbnail: 'https://img.youtube.com/vi/BXs223nIWWo/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(38, 89),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-01'),
      },
      {
        title: '김혜경 ‘의전 논란’에 “모든 것이 제 불찰…송구”',
        category: Category.POLITICS,
        tags: [tag7_1, tag7_2, tag7_3],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: '-XsbzwxjiVo',
        thumbnail: 'https://img.youtube.com/vi/-XsbzwxjiVo/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(42, 78),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2022-02-02'),
      },
      {
        title: '우크라이나 재건회의 \'루가노 선언\' 채택',
        category: Category.WORLD,
        tags: [tag8_1, tag8_2, tag8_3, tagRecommend],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: '1SRz_AE8R9E',
        thumbnail: 'https://img.youtube.com/vi/1SRz_AE8R9E/hqdefault.jpg',
        startTime: new Time(6, 0),
        endTime: new Time(56, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-06'),
      },
      {
        title: '원숭이두창 치료제 504명분 이번 주 도입',
        category: Category.SOCIETY,
        tags: [tag9_1, tag9_2, tag9_3, tagRecommend],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'WtuMp5G3yNo',
        thumbnail: 'https://img.youtube.com/vi/WtuMp5G3yNo/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(29, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-05'),
      },
      {
        title: 'WHO "여름철 원숭이두창 추가 확산 가능성"',
        category: Category.SOCIETY,
        tags: [tag10_1, tag10_2, tag10_3, tagRecommend],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: 'nsTeNVwGRMQ',
        thumbnail: 'https://img.youtube.com/vi/nsTeNVwGRMQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(36, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-01'),
      },
      {
        title: '"청나라 말기 같다"‥\'日 선진국 탈락\' 잇단 경고',
        category: Category.WORLD,
        tags: [tag11_1, tag11_2, tag11_3, tagRecommend],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'hhbs2rUII94',
        thumbnail: 'https://img.youtube.com/vi/hhbs2rUII94/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(24, 57),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2022-01-30'),
      },
      {
        title: '손님들이 건넨 술 마시고 사망…함께 있던 남성은 사고사',
        category: Category.SOCIETY,
        tags: [tag12_1, tag12_2, tag12_3, tagRecommend],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'mDW6crrUVpA',
        thumbnail: 'https://img.youtube.com/vi/mDW6crrUVpA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(61, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-06'),
      },
      { 
        title: '"하루만 일해도 40만 원"‥코로나 이후 몸값 \'껑충\'',
        category: Category.SOCIETY,
        tags: [tag13_1, tag13_2, tag13_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'IL_-MlTZAmQ',
        thumbnail: 'https://img.youtube.com/vi/IL_-MlTZAmQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(36, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-04-07'),
      },
      { 
        title: '누리호 2차 발사 성공.."우주시대 도약"',
        category: Category.SOCIETY,
        tags: [tag14_1, tag14_2, tag14_3, tagRecommend],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'srjLy3NQO6w',
        thumbnail: 'https://img.youtube.com/vi/srjLy3NQO6w/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(29, 47),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-21'),
      },
    ];

    const news = newsRepository.create(newsInfo);
    const news2 = await newsRepository.save(news);
    
    for (let i in news2) {
      // console.log(i);
      const news3 = await newsRepository.find({
        relations: ['tags'],
        where: {
          id: news2[i].id,
        },
      });
      console.log(news3);
    }
};
// insertNewsData();
// 
