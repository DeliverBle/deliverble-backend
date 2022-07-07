// src/repository/MotivationRepository/index.ts

import { EntityRepository, Repository } from 'typeorm';
import { News } from '../entity/News';


@EntityRepository(News)
export class NewsRepository extends Repository<News> {
    findById(id: number) {
        return this.createQueryBuilder("news")
            .where("news.id = :id", { id })
            .getOne();
    }
}
