import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {determineGenderByGivenString, Gender} from '../shared/common/Gender';
import {News} from './News';
import {KakaoRawInfo} from '../types';
import {Logger} from 'tslog';
import {IsEmail, Length} from 'class-validator';
import {Highlight} from './Highlight';

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
    unique: true,
  })
  kakaoId: string;

  @Length(10, 20)
  @Column()
  nickname: string;

  @IsEmail()
  @Column({
    unique: true,
    default: "NO_EMAIL"
  })
  email: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.UNSPECIFIED,
  })
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

  @OneToMany(() => Highlight, (highlight) => highlight.user, { eager: false })
  highlights: Promise<Highlight[]>;

  @AfterLoad()
  async nullChecks() {
    const NO_EMAIL = 'NO_EMAIL';
    if (!this.email) {
      log.info('User denied to provide email information');
      this.email = NO_EMAIL;
    }
    if (!this.gender) {
      this.gender = Gender.UNSPECIFIED;
    }
  }

  public addFavoriteNews = async (news: News) => {
    const favoriteNewsList = await this.favoriteNews;
    favoriteNewsList.push(news);
    log.debug(favoriteNewsList)
    return this;
  };

  public removeFavoriteNews = async (toBeDeletedNews: News) => {
    const favoriteNewsList = await this.favoriteNews;
    this.favoriteNews = Promise.resolve(
      favoriteNewsList.filter((nowIteratedNews) => {
        return nowIteratedNews.id !== toBeDeletedNews.id;
      }),
    );
    return this;
  };

  public addNewHighlight = async (highlight: Highlight) => {
    const highlights = await this.highlights;
    highlights.push(highlight);
    return this;
  }

  public removeExistingHighlight = async (toBeDeletedHighlight: Highlight) => {
    const highlights = await this.highlights;
    this.highlights = Promise.resolve(
        highlights.filter((highlight) => {
          return highlight.id !== toBeDeletedHighlight.id;
        }),
    );
    return this;
  }

  public getFavoriteNews = async () => {
    return await this.favoriteNews;
  };

  static fromKakaoRawInfo(kakaoRawInfo: KakaoRawInfo): User {
    return new User(
      kakaoRawInfo.kakaoId,
      kakaoRawInfo.nickname,
      kakaoRawInfo.email,
      kakaoRawInfo.gender,
    );
  }
}
