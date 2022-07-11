// src/repository/MotivationRepository/index.ts

import { EntityRepository, Repository } from 'typeorm';
import { News } from '../entity/News';

@EntityRepository(News)
export class NewsRepository extends Repository<News> {
  // id로 1개의 News 조회
  findById(id: number) {
    return this.createQueryBuilder('news')
    .where('news.id = :id', { id })
    .getOne();
  }

  // 모든 News 조회
  findAllNews() {
    return this.createQueryBuilder('news')
    .getMany();
  }

  // channel이 channels에 속하는 모든 News 조회
  findByChannels(channels: object) {
    return this.createQueryBuilder('news')
      .where('news.channel IN (:...channels)', { channels })
      .getMany();
  }

  // category가 categories에 속하는 모든 News 조회
  findByCategories(categories: object) {
    return this.createQueryBuilder('news')
      .where('news.category IN (:...categories)', { categories })
      .getMany();
  }

  // announcerGender가 일치하는 속하는 모든 News 조회
  findByAnnouncerGender(announcerGender: string) {
    return this.createQueryBuilder('news')
      .where('news.announcerGender = :announcerGender', { announcerGender })
      .getMany();
  }
}
