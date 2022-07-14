import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { determineGenderByGivenString, Gender } from '../shared/common/Gender';
import { News } from './News';

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
}
