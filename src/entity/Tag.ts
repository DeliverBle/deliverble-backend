import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { News } from './News';

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne((type) => News, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: 'news_id', referencedColumnName: 'id' })
  news!: News;
}
