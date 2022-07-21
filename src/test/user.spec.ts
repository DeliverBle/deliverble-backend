// import { expect } from "chai"
// import express from "express";
// import request from "supertest";
// import { sum } from "./function";

// const app = express();

// describe('Get News Detail - Valid Body - 200 Response', () => {
//     it('영상 조회 성공', done => {
//         request('http://127.0.0.1:8080')
//             .post('/v2/news/detail/4')  // api 요청
//             .set('Content-Type', 'application/json')
//             .expect(200) // 예측 상태 코드
//             .expect('Content-Type', /json/) // 예측 content-type
//             .then(res => {
//                 expect(res.body.data.id).to.equal(4);  
//                 // done();
//             })
//             .then(res => {
//                 done();
//             })
//             .catch(err => {
//                 console.error("######Error >>", err);
//                 done(err);
//             })
//     });
// });
