import { createConnection, getConnection, QueryRunner } from 'typeorm';
import { News } from '../entity/News';
import { Script } from '../entity/Script';
import { Tag } from '../entity/Tag';
import { Category } from '../shared/common/Category';
import { Channel } from '../shared/common/Channel';
import { Gender } from '../shared/common/Gender';
import { Suitability } from '../shared/common/Suitability';
import { NewsInfo } from '../types';
import { Time } from '../vo/Time';
import {Logger} from "tslog";

// 추천 태그 생성
let tagTestRecommend = new Tag();
tagTestRecommend.name = '딜리버블 추천';

// 뉴스 별 태그, 스크립트 생성

// 1번 뉴스
let tagTest1_1 = new Tag();
tagTest1_1.name = '경제';
let tagTest1_2 = new Tag();
tagTest1_2.name = '비트코인';
let tagTest1_3 = new Tag();
tagTest1_3.name = '폭락';

let scriptTest1_1 = new Script();
scriptTest1_1.startTime = new Time(0, 0);
scriptTest1_1.endTime = new Time(7, 7);
scriptTest1_1.text = '비트코인 가격이 1만 8천 달러선으로 폭락하면서 2020년 이후 최대치를 나타내고 있습니다.';
let scriptTest1_2 = new Script();
scriptTest1_2.startTime = new Time(7, 7);
scriptTest1_2.endTime = new Time(14, 78);
scriptTest1_2.text = '가상화폐 정보 사이트 코인게코에 따르면 비트코인 가격은 오늘 오전 한때 1만 7,800달러까지 하락하기도 했습니다.';
let scriptTest1_3 = new Script();
scriptTest1_3.startTime = new Time(14, 78);
scriptTest1_3.endTime = new Time(20, 55);
scriptTest1_3.text = '비트코인은 물가 상승 압력에 따른 세계적인 금리 인상 등의 여파로 12일 연속 하락했습니다.';
let scriptTest1_4 = new Script();
scriptTest1_4.startTime = new Time(20, 55);
scriptTest1_4.endTime = new Time(26, 55);
scriptTest1_4.text = '시가총액 2위 이더리움의 가격은 1천 달러가 무너지는 등 다른 코인의 가격도 동반 하락했습니다.';
let scriptTest1_5 = new Script();
scriptTest1_5.startTime = new Time(26, 85);
scriptTest1_5.endTime = new Time(35, 4);
scriptTest1_5.text = '가격이 폭락하면서 한때 3조 달러가 넘었던 전 세계 가상화폐 시장의 시가총액은 8천억 달러 선으로 하락했습니다.';

// 2번 뉴스
let tagTest2_1 = new Tag();
tagTest2_1.name = '북한';
let tagTest2_2 = new Tag();
tagTest2_2.name = '환경';
let tagTest2_3 = new Tag();
tagTest2_3.name = '임진강';

let scriptTest2_1 = new Script();
scriptTest2_1.startTime = new Time(0, 0);
scriptTest2_1.endTime = new Time(8, 18);
scriptTest2_1.text = '북한이 호우로 임진강 상류 황강댐 수문을 개방한 것으로 판단하고 있다고 군 소식통이 오늘 밝혔습니다.';
let scriptTest2_2 = new Script();
scriptTest2_2.startTime = new Time(8, 18);
scriptTest2_2.endTime = new Time(16, 71);
scriptTest2_2.text = '정부는 지난 28일 북한에 댐을 방류하면 사전 통지해 달라고 요청했지만, 북한은 이에 대한 응답 없이 방류에 나선 것으로 보입니다.';
let scriptTest2_3 = new Script();
scriptTest2_3.startTime = new Time(16, 71);
scriptTest2_3.endTime = new Time(27, 10);
scriptTest2_3.text = '군남댐 수위와 연계되는 임진강 최북단 필승교의 수위는 지난 28일 6m까지 오르기도 했지만 이후 현재까지 안정적으로 관리되고 있는 것으로 알려졌습니다.';
let scriptTest2_4 = new Script();
scriptTest2_4.startTime = new Time(27, 10);
scriptTest2_4.endTime = new Time(35, 74);
scriptTest2_4.text = '통일부는 이와 관련해 북한이 사전 통지 없이 황강댐 물을 방류한 데 대해 유감이라고 밝혔습니다.';

// 3번 뉴스
let tagTest3_1 = new Tag();
tagTest3_1.name = '제주';
let tagTest3_2 = new Tag();
tagTest3_2.name = '예산';
let tagTest3_3 = new Tag();
tagTest3_3.name = '무상급식';

let scriptTest3_1 = new Script();
scriptTest3_1.startTime = new Time(0, 0);
scriptTest3_1.endTime = new Time(4, 74);
scriptTest3_1.text = '초중고교 무상급식 예산이 46억 원 증액됩니다.';
let scriptTest3_2 = new Script();
scriptTest3_2.startTime = new Time(4, 74);
scriptTest3_2.endTime = new Time(15, 13);
scriptTest3_2.text = '오영훈 제주도지사와 김광수 제주도 교육감은 한라중학교를 찾아 올해 추경에 무상급식 예산 46억 원을 증액 반영하기로 합의했다고 밝혔습니다.';
let scriptTest3_3 = new Script();
scriptTest3_3.startTime = new Time(15, 13);
scriptTest3_3.endTime = new Time(21, 62);
scriptTest3_3.text = '이에 따라 무상급식 예산이 현재 439억 원에서 485억 원으로 늘게 됐습니다. ';
let scriptTest3_4 = new Script();
scriptTest3_4.startTime = new Time(21, 62);
scriptTest3_4.endTime = new Time(30, 2);
scriptTest3_4.text = '중학생 1인당 1식 단가는 현재 2,980원에서 24% 인상된 3,695원으로 오르게 됐습니다.';
let scriptTest3_5 = new Script();
scriptTest3_5.startTime = new Time(30, 2);
scriptTest3_5.endTime = new Time(35, 0);
scriptTest3_5.text = '인상된 단가는 다음 학기부터 적용됩니다. ';
let scriptTest3_6 = new Script();
scriptTest3_6.startTime = new Time(35, 0);
scriptTest3_6.endTime = new Time(37, 80);
scriptTest3_6.text = '지금까지 제주에서 전해 드렸습니다.';

// 4번 뉴스
let tagTest4_1 = new Tag();
tagTest4_1.name = '범죄';
let tagTest4_2 = new Tag();
tagTest4_2.name = '사망사고';
let tagTest4_3 = new Tag();
tagTest4_3.name = '공무원';

let scriptTest4_1 = new Script();
scriptTest4_1.startTime = new Time(0, 0);
scriptTest4_1.endTime = new Time(4, 74);
scriptTest4_1.text = '오늘 오전 9시쯤 경북 안동시청 주차타워 2층에서 50대 여성 공무원 A 씨가 쓰러진 채 발견됐습니다.';
let scriptTest4_2 = new Script();
scriptTest4_2.startTime = new Time(4, 74);
scriptTest4_2.endTime = new Time(15, 13);
scriptTest4_2.text = 'A 씨는 흉기에 복부를 찔려 크게 다친 상태로 병원으로 옮겨졌지만 1시간여 만에 숨졌습니다.';
let scriptTest4_3 = new Script();
scriptTest4_3.startTime = new Time(15, 13);
scriptTest4_3.endTime = new Time(21, 62);
scriptTest4_3.text = '용의자는 시청 산하기관 직원인 40대 남성 B 씨로 범행 직후 경찰에 자수했습니다.';
let scriptTest4_4 = new Script();
scriptTest4_4.startTime = new Time(21, 62);
scriptTest4_4.endTime = new Time(30, 2);
scriptTest4_4.text = '경찰은 B 씨가 사용한 흉기를 확보하고 범행 동기를 추궁하고 있습니다.';

// 5번 뉴스
let tagTest5_1 = new Tag();
tagTest5_1.name = '장관';
let tagTest5_2 = new Tag();
tagTest5_2.name = '인사';
let tagTest5_3 = new Tag();
tagTest5_3.name = '사퇴';

let scriptTest5_1 = new Script();
scriptTest5_1.startTime = new Time(0, 0);
scriptTest5_1.endTime = new Time(5, 47);
scriptTest5_1.text = '김승희 보건복지부 장관 후보자는 오늘 오전 입장문을 내고 후보직 사퇴 의사를 밝혔습니다.';
let scriptTest5_2 = new Script();
scriptTest5_2.startTime = new Time(5, 47);
scriptTest5_2.endTime = new Time(15, 74);
scriptTest5_2.text = '김 후보자는 지명 이후 객관적 근거가 없거나 관련이 없는 가족들의 사생활까지 수많은 비판이 제기됐다면서 각종 의혹이 사실이 아님을 반복적으로 설명했지만, ';
let scriptTest5_3 = new Script();
scriptTest5_3.startTime = new Time(15, 74);
scriptTest5_3.endTime = new Time(23, 87);
scriptTest5_3.text = '이 과정에서 공직자로서 부끄럽지 않게 살아왔던 자신의 명예는 물론이고 가족들까지 상처를 입는 것이 매우 힘들었다고 설명했습니다.';
let scriptTest5_4 = new Script();
scriptTest5_4.startTime = new Time(23, 87);
scriptTest5_4.endTime = new Time(32, 43);
scriptTest5_4.text = '또 정치 자금 의혹에 대해서는 고의적으로 사적인 용도로 유용한 바가 전혀 없으며 회계 처리 과정에서 실무적인 착오로 문제가 생겼지만,';
let scriptTest5_5 = new Script();
scriptTest5_5.startTime = new Time(32, 43);
scriptTest5_5.endTime = new Time(40, 0);
scriptTest5_5.text = '이러한 사실과 별개로 최종적으로 관리 책임에서 자유로울 수 없다는 지적을 겸허하게 수용한다고 덧붙였습니다.';

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

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

export const insertNewsData = async (connection) => {
  // await createConnection().then(async (connection) => {

    // drop tables
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    log.info("queryRunner executed")
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
    const scriptRepository = await Script.getRepository();

    await tagRepository.query(`set FOREIGN_KEY_CHECKS = 0`)
    await tagRepository.clear();

    await scriptRepository.query(`set FOREIGN_KEY_CHECKS = 0`)
    await scriptRepository.clear();

    await newsRepository.query(`set FOREIGN_KEY_CHECKS = 0`)
    await newsRepository.clear();

    await tagRepository.query(`set FOREIGN_KEY_CHECKS = 1`)
    await scriptRepository.query(`set FOREIGN_KEY_CHECKS = 1`)
    await newsRepository.query(`set FOREIGN_KEY_CHECKS = 1`)
    
    // 추천 태그 객체 생성
    let tagRecommend = tagRepository.create(tagTestRecommend);
    // tagRepository.save(tagRecommend);

    // 뉴스 별 태그 객체 생성
    let tag1_1 = tagRepository.create(tagTest1_1);
    let tag1_2 = tagRepository.create(tagTest1_2);
    let tag1_3 = tagRepository.create(tagTest1_3);

    let script1_1 = scriptRepository.create(scriptTest1_1);
    let script1_2 = scriptRepository.create(scriptTest1_2);
    let script1_3 = scriptRepository.create(scriptTest1_3);
    let script1_4 = scriptRepository.create(scriptTest1_4);
    let script1_5 = scriptRepository.create(scriptTest1_5);

    let tag2_1 = tagRepository.create(tagTest2_1);
    let tag2_2 = tagRepository.create(tagTest2_2);
    let tag2_3 = tagRepository.create(tagTest2_3);

    let script2_1 = scriptRepository.create(scriptTest2_1);
    let script2_2 = scriptRepository.create(scriptTest2_2);
    let script2_3 = scriptRepository.create(scriptTest2_3);
    let script2_4 = scriptRepository.create(scriptTest2_4);

    let tag3_1 = tagRepository.create(tagTest3_1);
    let tag3_2 = tagRepository.create(tagTest3_2);
    let tag3_3 = tagRepository.create(tagTest3_3);

    let script3_1 = scriptRepository.create(scriptTest3_1);
    let script3_2 = scriptRepository.create(scriptTest3_2);
    let script3_3 = scriptRepository.create(scriptTest3_3);
    let script3_4 = scriptRepository.create(scriptTest3_4);
    let script3_5 = scriptRepository.create(scriptTest3_5);
    let script3_6 = scriptRepository.create(scriptTest3_6);

    let tag4_1 = tagRepository.create(tagTest4_1);
    let tag4_2 = tagRepository.create(tagTest4_2);
    let tag4_3 = tagRepository.create(tagTest4_3);

    let script4_1 = scriptRepository.create(scriptTest4_1);
    let script4_2 = scriptRepository.create(scriptTest4_2);
    let script4_3 = scriptRepository.create(scriptTest4_3);
    let script4_4 = scriptRepository.create(scriptTest4_4);

    let tag5_1 = tagRepository.create(tagTest5_1);
    let tag5_2 = tagRepository.create(tagTest5_2);
    let tag5_3 = tagRepository.create(tagTest5_3);

    let script5_1 = scriptRepository.create(scriptTest5_1);
    let script5_2 = scriptRepository.create(scriptTest5_2);
    let script5_3 = scriptRepository.create(scriptTest5_3);
    let script5_4 = scriptRepository.create(scriptTest5_4);
    let script5_5 = scriptRepository.create(scriptTest5_5);

    let tag6_1 = tagRepository.create(tagTest6_1);
    let tag6_2 = tagRepository.create(tagTest6_2);
    let tag6_3 = tagRepository.create(tagTest6_3);

    let tag7_1 = tagRepository.create(tagTest7_1);
    let tag7_2 = tagRepository.create(tagTest7_2);
    let tag7_3 = tagRepository.create(tagTest7_3);

    let tag8_1 = tagRepository.create(tagTest8_1);
    let tag8_2 = tagRepository.create(tagTest8_2);
    let tag8_3 = tagRepository.create(tagTest8_3);
    
    let tag9_1 = tagRepository.create(tagTest9_1);
    let tag9_2 = tagRepository.create(tagTest9_2);
    let tag9_3 = tagRepository.create(tagTest9_3);

    let tag10_1 = tagRepository.create(tagTest10_1);
    let tag10_2 = tagRepository.create(tagTest10_2);
    let tag10_3 = tagRepository.create(tagTest10_3);

    let tag11_1 = tagRepository.create(tagTest11_1);
    let tag11_2 = tagRepository.create(tagTest11_2);
    let tag11_3 = tagRepository.create(tagTest11_3);

    let tag12_1 = tagRepository.create(tagTest12_1);
    let tag12_2 = tagRepository.create(tagTest12_2);
    let tag12_3 = tagRepository.create(tagTest12_3);

    let tag13_1 = tagRepository.create(tagTest13_1);
    let tag13_2 = tagRepository.create(tagTest13_2);
    let tag13_3 = tagRepository.create(tagTest13_3);

    let tag14_1 = tagRepository.create(tagTest14_1);
    let tag14_2 = tagRepository.create(tagTest14_2);
    let tag14_3 = tagRepository.create(tagTest14_3);

    const newsInfo = [
      {
        title: '비트코인, 한때 1만 8천 달러 붕괴',
        category: Category.ECONOMY,
        tags: [tag1_1, tag1_2, tag1_3, tagRecommend],
        scripts: [script1_1, script1_2, script1_3, script1_4, script1_5],
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
        scripts: [script2_1, script2_2, script2_3, script2_4],
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
        scripts: [script3_1, script3_2, script3_3, script3_4, script3_5, script3_6],
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
        scripts: [script4_1, script4_2, script4_3, script4_4],
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
        scripts: [script5_1, script5_2, script5_3, script5_4, script5_5],
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
      log.debug(news3);
    }
};
// insertNewsData();
// 
