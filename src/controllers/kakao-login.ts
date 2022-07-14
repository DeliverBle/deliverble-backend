import passport from 'passport';
import KakaoStrategy from 'passport-kakao';
import { findUserByEmail, loginUserWithKakao } from '../service/UserService';
import { isNotFoundUser, NotFoundUser } from '../entity/NotFoundUser';

export default function kakaoLoginStrategy() {
  passport.use(
    'kakao-login',
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: process.env.KAKAO_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const {
          id,
          username: name,
          _json: {
            properties: { profile_image, nickname, thumbnail_image },
            kakao_account: { email },
          },
        } = profile;
        try {
          await loginUserWithKakao(email);
          done(null);
        } catch (err) {
          console.log(err);
          done(err);
        }
      },
    ),
  );
}
