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

@Entity()
export class User extends BaseEntity {
  constructor(_nickname: string, _email: string, _gender: string) {
    super();
    this.nickname = _nickname;
    this.email = _email;
    this.gender = determineGenderByGivenString(_gender);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  gender: Gender;

  @ManyToMany((type) => News)
  @JoinTable({
    name: 'user_favorite_news',
    joinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'news',
      referencedColumnName: 'id',
    },
  })
  favoriteNews: News[];

  @AfterLoad()
  async nullChecks() {
    if (!this.favoriteNews) {
      this.favoriteNews = [];
    }
  }

  public favoriteFreshNews = (news: News) => {
    console.log('>>> favoriteNews ', this.favoriteNews);
    this.favoriteNews.push(news);
    return this;
  };

  static fromKakaoRawInfo(kakaoRawInfo: KakaoRawInfo): User {
    return new User(kakaoRawInfo.nickname, kakaoRawInfo.email, Gender.UNSPECIFIED);
  }
}
