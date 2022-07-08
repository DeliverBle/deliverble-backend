import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Category } from '../shared/common/Category';
import { Gender } from '../shared/common/Gender';
import { Time } from '../vo/Time';
import { Suitability } from '../shared/common/Suitability';
import { Tag } from './Tag';
import { NewsInfo } from '../types';
import { Channel } from '../shared/common/Channel';

@Entity()
export class News extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({
    type: 'enum',
    name: 'category',
    enum: Category,
    default: Category.UNSPECIFIED,
  })
  category: Category;

  @OneToMany(() => Tag, (tag) => tag.news, {
    cascade: true,
  })
  tags: Tag[];

  @Column({
    type: 'enum',
    name: 'announcer_gender',
    enum: Gender,
    default: Gender.UNSPECIFIED,
  })
  announcerGender: Gender;

  @Column({
    type: 'enum',
    name: 'channel',
    enum: Channel,
    default: Channel.UNSPECIFIED,
  })
  channel: Channel;

  @Column({ type: 'varchar', length: 1000 })
  link: string;

  @Column(() => Time)
  time: Time;

  @Column(() => Time)
  runningTime: Time;

  @Column({
    type: 'enum',
    name: 'suitability',
    enum: Suitability,
    default: Suitability.MEDIUM,
  })
  suitability: Suitability;

  @Column('varchar')
  isEmbeddable: boolean;

  @Column('date')
  reportDate: Date;
}
