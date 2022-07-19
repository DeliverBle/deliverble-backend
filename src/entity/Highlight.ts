import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
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

  @Column()
  scriptId: number;

  @Column()
  startingIndex: number;

  @Column()
  endingIndex: number;
}
