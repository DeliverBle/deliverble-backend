import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Category } from '../../shared/common/Category';
import { Gender } from '../../shared/common/Gender';
import { Time } from '../../vo/Time';
import { Suitability } from '../../shared/common/Suitability';
import { Tag } from '../Tag/Tag';
import { Channel } from '../../shared/common/Channel';
import { Script } from '../Script/Script';
import {IsNotEmpty} from "class-validator";

@Entity()
export class News extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
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
    onDelete: "CASCADE"
  })
  tags: Tag[];

  @OneToMany(() => Script, (script) => script.news, {
    cascade: true,
    onDelete: "CASCADE"
  })
  scripts: Script[];

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

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 1000 })
  link: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 1000 })
  thumbnail: string;

  @Column(() => Time)
  startTime: Time;

  @Column(() => Time)
  endTime: Time;

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
