import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Memo extends BaseEntity {
    constructor(_keyword: string, _content: string) {
        super();
        this.keyword = _keyword;
        this.content = _content;
    }
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 100})
    keyword!: string;

    @Column({type: 'varchar', length: 100})
    content!: string;
}