import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import { User } from './User';

  
  @Entity()
  export class Highlight extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne((type) => User, {
      onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    userId!: User;
  
    @Column()
    scriptId: number;
    
    @Column()
    startingIndex: number;
    
    @Column()
    endingIndex: number;        
  }
  