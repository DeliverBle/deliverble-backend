import passport from 'passport';
import KakaoStrategy from 'passport-kakao';
import { Logger } from 'tslog';
require("dotenv").config();


const log: Logger = new Logger({ name: '카카오 로그인 좀 되자!' });

export default function kakaoLoginStrategy() {
  passport.use(
    'kakao-login',
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: process.env.KAKAO_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        // log.debug(`accessToken`, accessToken);
        done(null, [accessToken, refreshToken, profile._json.id]);
      },
    ),
  );
}
