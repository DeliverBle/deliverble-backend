import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Time } from '../vo/Time';
import { News } from './News';

const defaultTime: Time = new Time(0, 0)

@Entity()
export class Script extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => News, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: 'news_id', referencedColumnName: 'id' })
  news!: News;

  @Column(() => Time, )
  startTime: Time;

  @Column(() => Time)
  endTime: Time;

  @Column({
    default: '',
  })
  text!: string;

}
