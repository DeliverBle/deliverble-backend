import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Highlight } from "./Highlight";

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

    @ManyToOne((type) => Highlight, (highlight) => highlight.memo, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete'
    })
    @JoinColumn()
    highlight!: Highlight;
}