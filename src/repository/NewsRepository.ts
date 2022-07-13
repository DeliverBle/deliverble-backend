// src/repository/MotivationRepository/index.ts

import { EntityRepository, Repository } from 'typeorm';
import { News } from '../entity/News';
import { SearchCondition } from '../types';

@EntityRepository(News)
export class NewsQueryRepository extends Repository<News> {
  // id로 1개의 News 조회
  findById(id: number) {
    return this.createQueryBuilder('news').where('news.id = :id', { id }).getOne();
  }

  // 모든 News 조회
  findAllNews(searchCondition: SearchCondition) {
    return this.createQueryBuilder('news')
      .from(News, 'news')
      .limit(searchCondition.getLimit())
      .offset(searchCondition.getOffset())
      .disableEscaping()
      .getManyAndCount();
  }

  // channel이 channels에 속하는 모든 News 조회
  findByChannels(searchCondition: SearchCondition) {
    const channels = searchCondition.getChannels();
    return this.createQueryBuilder('news')
      .where('news.channel IN (:...channels)', { channels })
      .disableEscaping()
      .getManyAndCount();
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
