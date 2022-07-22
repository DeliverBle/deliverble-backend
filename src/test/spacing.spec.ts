// import { expect } from "chai"
// import express from "express";
// import request from "supertest";
// import { CREATE_SPACING_SCRIPT_ID, NEWS_ID, SPACING_ID_TO_REMOVE, SPACING_INDEX } from "../shared/common/TestNumber";
// require("dotenv").config();

// const app = express();
// const newsId = NEWS_ID;
// const scriptIdToCreateSpacing = CREATE_SPACING_SCRIPT_ID;
// const index = SPACING_INDEX;
// const spacing_id = SPACING_ID_TO_REMOVE;


// describe('GET /v2/spacing', () => {
// 	it('스페이싱 조회 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.get('/v2/spacing')  // api 요청
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
// 	it('스페이싱 조회 실패 - 잘못된 토큰', done => {
// 		request('http://127.0.0.1:8080')
// 			.get('/v2/spacing')  // api 요청
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

// describe('POST /v2/spacing/create', () => {
// 	it('스페이싱 생성 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/spacing/create')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": process.env.ACCESS_TOKEN,
// 				"user_id": process.env.KAKAO_ID,
// 				"news_id": newsId,
// 				"script_id": scriptIdToCreateSpacing,
// 				"index": index
// 			}) // request body
// 			.expect(201) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 				done();
// 			})
// 			.catch(err => {
// 				console.error("######Error >>", err);
// 				done(err);
// 			});
// 	});
// 	it('스페이싱 생성 실패 - 잘못된 토큰', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/spacing/create')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": "abcdefg",
// 				"user_id": process.env.KAKAO_ID,
// 				"news_id": newsId,
// 				"script_id": scriptIdToCreateSpacing,
// 				"index": index
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

// describe('POST /v2/spacing/remove', () => {
// 	it('스페이싱 삭제 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/spacing/remove')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": process.env.ACCESS_TOKEN,
// 				"user_id": process.env.KAKAO_ID,
// 				"news_id": newsId,
// 				"spacing_id": spacing_id
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
