// import { expect } from "chai"
// import express from "express";
// import request from "supertest";

// const app = express();

// describe('POST /v2/news/search', () => {
// 	it('영상 검색 결과 조회 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/news/search')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 					"channels": ["KBS", "SBS"],
// 					"categories": ["세계", "정치", "건강", "사회", "연예"],
// 					"announcerGender": ["여성"],
// 					"currentPage": 1,
// 					"listSize": 12
// 			}) // request body
// 			.expect(200) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 					expect(res.body.data[0].id).to.equal(39);  
// 					done();
// 			})
// 			.catch(err => {
// 					console.error("######Error >>", err);
// 					done(err);
// 			})
// 	});
// 	it('영상 검색 결과 조회 실패 - 조회 가능한 페이지 인덱스 초과', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/news/search')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"channels": ["KBS", "SBS"],
// 				"categories": ["세계", "정치", "건강", "사회", "연예"],
// 				"announcerGender": ["여성"],
// 				"currentPage": 100,
// 				"listSize": 12
// 			}) // request body
// 			.expect(404) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 				done();
// 			})
// 			.catch(err => {
// 				console.error("######Error >>", err);
// 				done(err);
// 			})
// 	});
// });

// describe('GET /v2/news/detail', () => {
// 	it('영상 세부 정보 조회 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.get('/v2/news/detail/4')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.expect(200) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 				expect(res.body.data.id).to.equal(4);
// 				done();
// 			})
// 			.catch(err => {
// 				console.error("######Error >>", err);
// 				done(err);
// 			})
// 	});
// });

// describe('GET /v2/news/recommend', () => {
// 	it('추천 영상 조회 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.get('/v2/news/recommend')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.expect(200) // 예측 상태 코드
// 			.expect('Content-Type', /json/) // 예측 content-type
// 			.then(res => {
// 				done();
// 			})
// 			.catch(err => {
// 				console.error("######Error >>", err);
// 				done(err);
// 			})
// 	});
// });
