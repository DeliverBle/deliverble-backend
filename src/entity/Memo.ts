import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Memo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 100})
    keyword!: string;

    @Column({type: 'varchar', length: 100})
    content!: string;
}