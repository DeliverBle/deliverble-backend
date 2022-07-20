import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  OneToOne,
  OneToMany
} from 'typeorm';
import { User } from './User';
import {Memo} from "./Memo";
import {Field} from "mysql2";
import {ArrayMaxSize, maxLength} from "class-validator";

@Entity()
@Index(["scriptId", "startingIndex", "endingIndex"], { unique: true })
export class Highlight extends BaseEntity {
  constructor(_user: User, _scriptId: number, _startingIndex: number, _endingIndex: number) {
    super();
    this.user = _user;
    this.scriptId = _scriptId;
    this.startingIndex = _startingIndex;
    this.endingIndex = _endingIndex;
  }
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;

  @OneToMany((type) => Memo, memo => memo.highlight, {
    eager: true
  })
  @JoinColumn()
  @ArrayMaxSize(1)
  memo?: Promise<Memo[]>;

  @Column()
  scriptId: number;

  @Column()
  startingIndex: number;

  @Column()
  endingIndex: number;

  public async addNewMemo(memo: Memo): Promise<Highlight> {
    const nowMemo = await this.memo;
    this.memo = Promise.resolve([memo]);
    return this;
  }

  public async removeExistingMemo(): Promise<Highlight> {
    const nowMemo = await this.memo;
    this.memo = Promise.resolve([]);
    return this;
  }

  public getMemo(): Promise<Memo[]> {
    return this.memo;
  }
}
