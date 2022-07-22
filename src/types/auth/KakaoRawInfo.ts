import {IsNotEmpty} from "class-validator";

export class KakaoRawInfo {
    constructor(kakaoId, nickname, profile_image, email, gender) {
        this.kakaoId = kakaoId;
        this.nickname = nickname;
        this.profile_image = profile_image;
        this.email = email;
        this.gender = gender;
    }

    @IsNotEmpty()
    kakaoId: string;
    @IsNotEmpty()
    nickname: string;
    profile_image: string;
    email: string;
    gender: string;

    static toKakaoRawInfo(profile) {
        const {
            id,
            properties: {nickname, profile_image},
            kakao_account: {email, gender},
        } = profile;
        return new KakaoRawInfo(id, nickname, profile_image, email, gender);
    }
}