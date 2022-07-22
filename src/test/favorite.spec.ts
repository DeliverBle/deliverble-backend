// import { expect } from "chai"
// import express from "express";
// import request from "supertest";
// import { NEWS_ID } from "../shared/common/TestNumber";
// require("dotenv").config();

// const app = express();

// const newsId = NEWS_ID

// describe('GET /v2/user/favorite/all', () => {
// 	it('즐겨찾기한 뉴스 조회 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.get('/v2/user/favorite/all')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": process.env.ACCESS_TOKEN,
// 				"user_id": process.env.KAKAO_ID,
// 				"news_id": newsId
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
// 	it('즐겨찾기한 뉴스 조회 실패 - 잘못된 토큰', done => {
// 		request('http://127.0.0.1:8080')
// 			.get('/v2/user/favorite/all')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": "abcdefg",
// 				"user_id": process.env.KAKAO_ID,
// 				"news_id": newsId
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

// describe('POST /v2/user/favorite/add', () => {
// 	it('뉴스 즐겨찾기 추가 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/user/favorite/add')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": process.env.ACCESS_TOKEN,
// 				"user_id": process.env.KAKAO_ID,
// 				"news_id": newsId
// 			}) // request body
// 			.expect(200) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
//         expect(res.body.message[0].id).to.equal(newsId);
// 				done();
// 			})
// 			.catch(err => {
// 				console.error("######Error >>", err);
// 				done(err);
// 			});
// 	});
// 	it('뉴스 즐겨찾기 추가 실패 - 잘못된 토큰', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/user/favorite/add')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": "abcdefg",
// 				"user_id": process.env.KAKAO_ID,
// 				"news_id": newsId
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

// describe('POST /v2/user/favorite/remove', () => {
// 	it('뉴스 즐겨찾기 삭제 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/user/favorite/remove')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": process.env.ACCESS_TOKEN,
// 				"user_id": process.env.KAKAO_ID,
// 				"news_id": newsId
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
