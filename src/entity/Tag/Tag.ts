import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { News } from '../News/News';
import {IsNotEmpty, Length} from "class-validator";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Length(10, 20)
  @Column()
  name!: string;

  @ManyToOne((type) => News, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: 'news_id', referencedColumnName: 'id' })
  news!: News;
}
