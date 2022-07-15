import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { determineGenderByGivenString, Gender } from '../shared/common/Gender';
import { News } from './News';
import {KakaoRawInfo} from "../types";
import {Logger} from "tslog";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

@Entity()
export class User extends BaseEntity {
  constructor(_kakaoId: string, _nickname: string, _email: string, _gender: string) {
    super();
    this.kakaoId = _kakaoId;
    this.nickname = _nickname;
    this.email = _email;
    this.gender = determineGenderByGivenString(_gender);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'bigint',
    unique: true
  })
  kakaoId: string;

  @Column()
  nickname: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  gender: Gender;

  @ManyToMany(() => News, { eager: false })
  @JoinTable({
    name: 'user_favorite_news',
    joinColumn: {
      name: 'user',
      referencedColumnName: 'kakaoId',
    },
    inverseJoinColumn: {
      name: 'news',
      referencedColumnName: 'id',
    },
  })
  favoriteNews: Promise<News[]>;

  @AfterLoad()
  async nullChecks() {
    const NO_EMAIL = "NO_EMAIL";
    // if (!this.favoriteNews) {
    //   this.favoriteNews = [];
    // }
    if (!this.email) {
      log.info("User denied to provide email information")
      this.email = NO_EMAIL
    }
  }

  public addFavoriteNews = async (news: News) => {
    console.log('>>> favoriteNews ', this.favoriteNews);
    const favoriteNewsList = await this.favoriteNews;
    favoriteNewsList.push(news);
    return this;
  };

  public getFavoriteNews = async () => {
    return await this.favoriteNews;
  }

  static fromKakaoRawInfo(kakaoRawInfo: KakaoRawInfo): User {
    return new User(kakaoRawInfo.kakaoId, kakaoRawInfo.nickname, kakaoRawInfo.email, Gender.UNSPECIFIED);
  }
}
