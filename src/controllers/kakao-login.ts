import passport from 'passport';
import KakaoStrategy from 'passport-kakao';
import { loginUserWithKakao } from '../service/UserService';
import { KakaoRawInfo } from '../types';

export default function kakaoLoginStrategy() {
  passport.use(
    'kakao-login',
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: process.env.KAKAO_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        // const kakaoRawInfo = KakaoRawInfo.toKakaoRawInfo(profile._json);
          console.log("accessToken: ", accessToken)
          console.log("refreshToken: ", refreshToken)
        // console.log(' >>>>>>>>>>>> kakaoRawinfo', kakaoRawInfo);
        done(null, [accessToken, refreshToken]);
        // try {
        //   // await loginUserWithKakao(kakaoRawInfo);
        //   done(null);
        // } catch (err) {
        //   console.log(err);
        //   done(err);
        // }
      },
    ),
  );
}
