import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Spacing extends BaseEntity {
  constructor(_user: User, _scriptId: number, _index: number) {
    super();
    this.user = _user;
    this.scriptId = _scriptId;
    this.index = _index;
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
  index: number;
}
