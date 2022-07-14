import passport from 'passport';
import KakaoStrategy from 'passport-kakao';

export default function kakaoLoginStrategy() {
  passport.use(
    'kakao-login',
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: process.env.KAKAO_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        done(null, [accessToken, refreshToken]);
      },
    ),
  );
}
