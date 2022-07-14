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
        console.log(' >>>>>>> accessToken >>>>>>>>> ', accessToken);
        console.log(' >>>>>>>>> refreshToken >>>>>>>>> ', refreshToken);
        console.log(' >>>>>>>>> profile >>>>>>>>> ', profile);
        try {
          console.log(' >>>>>>> accessToken >>>>>>>>> ', accessToken);
          console.log(' >>>>>>>>> refreshToken >>>>>>>>> ', refreshToken);
          console.log(' >>>>>>>>> profile >>>>>>>>> ', profile);
          done(null);
        } catch (err) {
          console.log(err);
          done(err);
        }
      },
    ),
  );
}
