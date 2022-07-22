// import { expect } from "chai"
// import express from "express";
// import request from "supertest";
// import { 
// 	SCRIPT_ID_TO_CREATE_HIGHLIGHT,
// 	HIGHLIGHT_ENDING_INDEX,
// 	HIGHLIGHT_STARTING_INDEX, 
// 	NEWS_ID, 
// 	REMOVE_HIGHLIGHT_ID,
// 	HIGHLIGHT_ID_FOR_MEMO, 
// } from "../shared/common/TestNumber";
// require("dotenv").config();

// const app = express();
// const newsID = NEWS_ID;
// const scriptIdToCreateHighlight = SCRIPT_ID_TO_CREATE_HIGHLIGHT;
// const stringIndex = HIGHLIGHT_STARTING_INDEX;
// const endingIndex = HIGHLIGHT_ENDING_INDEX;
// const removeHighlightId = REMOVE_HIGHLIGHT_ID;
// const highlightIdForMemo = HIGHLIGHT_ID_FOR_MEMO;

// describe('GET /v2/highlight', () => {
// 	it('하이라이트 조회 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.get('/v2/highlight')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": process.env.ACCESS_TOKEN,
// 				"user_id": process.env.KAKAO_ID,
// 				"news_id": newsID
// 			}) // request body
// 			.expect(200) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 				done();
// 			})
// 			.catch(err => {
// 				console.error("######Error >>", err);
// 				done(err);
// 			});
// 	});
// 	it('하이라이트 조회 실패 - 잘못된 토큰', done => {
// 		request('http://127.0.0.1:8080')
// 			.get('/v2/highlight')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": "abcdefg",
// 				"user_id": process.env.KAKAO_ID,
// 				"news_id": newsID
// 		}) // request body
// 			.expect(403) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 					done();
// 			})
// 			.catch(err => {
// 					console.error("######Error >>", err);
// 					done(err);
// 			})
// 	});
// });

// describe('POST /v2/highlight/create', () => {
// 	it('하이라이트 생성 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/highlight/create')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": process.env.ACCESS_TOKEN,
// 				"user_id": process.env.KAKAO_ID,
// 				"script_id": scriptIdToCreateHighlight,
// 				"starting_index": stringIndex,
// 				"ending_index": endingIndex
// 			}) // request body
// 			.expect(201) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 				expect(res.body.data[0].scriptId).to.equal(scriptIdToCreateHighlight);
// 				done();
// 			})
// 			.catch(err => {
// 				console.error("######Error >>", err);
// 				done(err);
// 			});
// 	});
// 	it('하이라이트 생성 실패 - 잘못된 토큰', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/highlight/create')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": "abcdefg",
// 				"user_id": process.env.KAKAO_ID,
// 				"script_id": scriptIdToCreateHighlight,
// 				"starting_index": stringIndex,
// 				"ending_index": endingIndex
// 			}) // request body
// 			.expect(403) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 				done();
// 			})
// 			.catch(err => {
// 				console.error("######Error >>", err);
// 				done(err);
// 			});
// 	});	
// });


// describe('POST /v2/highlight/remove', () => {
// 	it('하이라이트 삭제 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/highlight/remove')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": process.env.ACCESS_TOKEN,
// 				"user_id": process.env.KAKAO_ID,
// 				"highlight_id": removeHighlightId
// 			}) // request body
// 			.expect(200) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 				done();
// 			})
// 			.catch(err => {
// 				console.error("######Error >>", err);
// 				done(err);
// 			});
// 	});
// });

// describe('POST /v2/highlight/memo/add', () => {
// 	it('메모 추가 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/highlight/memo/add')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": process.env.ACCESS_TOKEN,
// 				"user_id": process.env.KAKAO_ID,
// 				"highlight_id": highlightIdForMemo,
// 				"keyword": "코로나 19가 확산하면서",
// 				"content": "숨 쉬지 말고 읽기"
// 			}) // request body
// 			.expect(200) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 				done();
// 			})
// 			.catch(err => {
// 				console.error("######Error >>", err);
// 				done(err);
// 			});
// 	});
// 	it('메모 추가 실패 - 잘못된 토큰', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/highlight/memo/add')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": "abcdefg",
// 				"user_id": process.env.KAKAO_ID,
// 				"highlight_id": highlightIdForMemo,
// 				"keyword": "코로나 19가 확산하면서",
// 				"content": "숨 쉬지 말고 읽기"
// 		}) // request body
// 			.expect(403) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 					done();
// 			})
// 			.catch(err => {
// 					console.error("######Error >>", err);
// 					done(err);
// 			})
// 	});
// });

// describe('POST /v2/highlight/memo/update', () => {
// 	it('메모 수정 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/highlight/memo/update')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": process.env.ACCESS_TOKEN,
// 				"user_id": process.env.KAKAO_ID,
// 				"highlight_id": highlightIdForMemo,
// 				"keyword": "코로나 19가 확산하면서",
// 				"content": "숨 쉬지 말고 읽기"
// 			}) // request body
// 			.expect(200) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 				done();
// 			})
// 			.catch(err => {
// 				console.error("######Error >>", err);
// 				done(err);
// 			});
// 	});
// 	it('메모 수정 실패 - 잘못된 토큰', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/highlight/memo/update')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": "abcdefg",
// 				"user_id": process.env.KAKAO_ID,
// 				"highlight_id": highlightIdForMemo,
// 				"keyword": "코로나 19가 확산하면서",
// 				"content": "숨 쉬지 말고 읽기"
// 		}) // request body
// 			.expect(403) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 					done();
// 			})
// 			.catch(err => {
// 					console.error("######Error >>", err);
// 					done(err);
// 			})
// 	});
// });

// describe('POST /v2/highlight/memo/remove', () => {
// 	it('메모 삭제 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/highlight/memo/remove')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": process.env.ACCESS_TOKEN,
// 				"user_id": process.env.KAKAO_ID,
// 				"highlight_id": highlightIdForMemo
// 			}) // request body
// 			.expect(200) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 				done();
// 			})
// 			.catch(err => {
// 				console.error("######Error >>", err);
// 				done(err);
// 			});
// 	});
// });
