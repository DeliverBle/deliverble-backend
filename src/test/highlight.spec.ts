// import { assert, expect } from 'chai';
// import { News } from '../entity/News';
// import { Script } from '../entity/Script';
// import { Tag } from '../entity/Tag';
// import { User } from '../entity/User';
// import { Category } from '../shared/common/Category';
// import { Channel } from '../shared/common/Channel';
// import { Gender } from '../shared/common/Gender';
// import { Suitability } from '../shared/common/Suitability';
// import { Time } from '../vo/Time';
// import Sinon from 'sinon';

// import { TestFactory } from './factory';
// import { Repository } from 'typeorm';
// import { doesNotMatch } from 'assert';


// const userInfo = {
// 	nickname: 'pobi',
// 	email: 'javajigi@gmail.com',
// 	gender: '남자',
// };
// let userMock1 = new User("2323", userInfo.nickname, userInfo.email, userInfo.gender);

// let tagTest1_1 = new Tag();
// tagTest1_1.name = '경제';
// let tagTest1_2 = new Tag();
// tagTest1_2.name = '비트코인';
// let tagTest1_3 = new Tag();
// tagTest1_3.name = '폭락';

// let scriptTest1_1 = new Script();
// scriptTest1_1.startTime = new Time(0, 0);
// scriptTest1_1.endTime = new Time(7, 7);
// scriptTest1_1.text = '비트코인 가격이 1만 8천 달러선으로 폭락하면서 2020년 이후 최대치를 나타내고 있습니다.';
// let scriptTest1_2 = new Script();
// scriptTest1_2.startTime = new Time(7, 7);
// scriptTest1_2.endTime = new Time(14, 78);
// scriptTest1_2.text = '가상화폐 정보 사이트 코인게코에 따르면 비트코인 가격은 오늘 오전 한때 1만 7,800달러까지 하락하기도 했습니다.';
// let scriptTest1_3 = new Script();
// scriptTest1_3.startTime = new Time(14, 78);
// scriptTest1_3.endTime = new Time(20, 55);
// scriptTest1_3.text = '비트코인은 물가 상승 압력에 따른 세계적인 금리 인상 등의 여파로 12일 연속 하락했습니다.';
// let scriptTest1_4 = new Script();
// scriptTest1_4.startTime = new Time(20, 55);
// scriptTest1_4.endTime = new Time(26, 55);
// scriptTest1_4.text = '시가총액 2위 이더리움의 가격은 1천 달러가 무너지는 등 다른 코인의 가격도 동반 하락했습니다.';
// let scriptTest1_5 = new Script();
// scriptTest1_5.startTime = new Time(26, 85);
// scriptTest1_5.endTime = new Time(35, 4);
// scriptTest1_5.text = '가격이 폭락하면서 한때 3조 달러가 넘었던 전 세계 가상화폐 시장의 시가총액은 8천억 달러 선으로 하락했습니다.';

// const newsInfo = {
// 	title: '비트코인, 한때 1만 8천 달러 붕괴',
// 	category: Category.ECONOMY,
// 	tags: [tagTest1_1, tagTest1_2, tagTest1_3],
// 	scripts: [scriptTest1_1, scriptTest1_2, scriptTest1_3, scriptTest1_4, scriptTest1_5],
// 	announcerGender: Gender.MEN,
// 	channel: Channel.SBS,
// 	link: 'S_gtbu2VRlI',
// 	thumbnail: 'https://img.youtube.com/vi/S_gtbu2VRlI/hqdefault.jpg',
// 	startTime: new Time(0, 0),
// 	endTime: new Time(35, 4),
// 	suitability: Suitability.HIGH,
// 	isEmbeddable: true,
// 	reportDate: new Date('2022-06-19'),
// };



// describe('Testing user component', () => {
// 	const factory: TestFactory = new TestFactory();

// 	// init testUser
// 	const testUser: User = userMock1;

// 	// init mockNews
// 	const mockNews = new News();
// 	mockNews.title = newsInfo.title;
// 	mockNews.category = newsInfo.category;
// 	mockNews.tags = newsInfo.tags;
// 	mockNews.scripts = newsInfo.scripts;
// 	mockNews.announcerGender = newsInfo.announcerGender;
// 	mockNews.channel = newsInfo.channel;
// 	mockNews.link = newsInfo.link;
// 	mockNews.thumbnail = newsInfo.thumbnail;
// 	mockNews.startTime = newsInfo.startTime;
// 	mockNews.endTime = newsInfo.endTime;
// 	mockNews.suitability = newsInfo.suitability;
// 	mockNews.isEmbeddable = newsInfo.isEmbeddable;
// 	mockNews.reportDate = newsInfo.reportDate;

// 	let userRepository;

// 	beforeEach(async (done) => {
// 		await factory.init().then(done);
// 		console.log(factory.connection)
// 		userRepository = await factory.connection.getRepository(User);
// 		console.log("userRepository", userRepository);
// 	});

// 	it('should return user1 when calling repository', async() => {
// 		//
// 	})


// 	after((done) => {
// 		factory.close().then(done);
// 	});
// });
