import { expect } from "chai"
import express from "express";
import request from "supertest";
import { SIGNUP_KAKAO_ID, SIGNUP_TOKEN } from "../shared/common/TestNumber";
require("dotenv").config();

const app = express();

const signupToken = SIGNUP_TOKEN;
const signupKakaoId = SIGNUP_KAKAO_ID;

describe('POST /v2/auth/login', () => {
	it('로그인 성공', done => {
		request('http://127.0.0.1:8080')
			.post('/v2/auth/login')  // api 요청
			.set('Content-Type', 'application/json')
			.send({
				"access_token": process.env.ACCESS_TOKEN,
				"user_id": process.env.KAKAO_ID
			}) // request body
			.expect(200) // 예측 상태 코드
			.expect('Content-Type', /json/) // 예측 content-type
			.then(res => {
				done();
			})
			.catch(err => {
				console.error("######Error >>", err);
				done(err);
			});
	});
	it('로그인 실패 - 잘못된 토큰', done => {
		request('http://127.0.0.1:8080')
			.post('/v2/auth/login')  // api 요청
			.set('Content-Type', 'application/json')
			.send({
				"access_token": "abcdefg",
				"user_id": process.env.KAKAO_ID,
		}) // request body
			.expect(403) // 예측 상태 코드
			.expect('Content-Type', /json/) // 예측 content-type
			.then(res => {
					done();
			})
			.catch(err => {
					console.error("######Error >>", err);
					done(err);
			})
	});
});

// 해당 KakaoId를 가진 user가 있다면 지운 후 실행
// describe('POST /v2/auth/signup', () => {
// 	it('회원가입 성공', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/auth/signup')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": signupToken,
// 				"user_id": signupKakaoId
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
// 	it('회원가입 실패 - 잘못된 토큰', done => {
// 		request('http://127.0.0.1:8080')
// 			.post('/v2/auth/signup')  // api 요청
// 			.set('Content-Type', 'application/json')
// 			.send({
// 				"access_token": "abcdefg",
// 				"user_id": signupKakaoId
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
