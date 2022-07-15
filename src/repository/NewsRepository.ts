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
  findAllNews = async (searchCondition: SearchCondition) => {
    const totalCount = await this.createQueryBuilder('news').getCount();
    const totalNews = await this.createQueryBuilder('news')
      // .limit(searchCondition.getLimit())
      // .offset(searchCondition.getOffset())
      // .disableEscaping()
      .getMany();
    return totalNews;
  }

  // channel이 channels에 속하는 모든 News 조회
  findByChannels = async (searchCondition: SearchCondition) => {
    const channels = searchCondition.channels;
    const totalCount = this.createQueryBuilder('news')
      .where('news.channel IN (:...channels)', { channels }).getCount();
    const totalNews = this.createQueryBuilder('news')
      .where('news.channel IN (:...channels)', { channels })
      // .limit(searchCondition.getLimit())
      // .offset(searchCondition.getOffset())
      // .disableEscaping()
      .getMany();
    return totalNews;
  }

  // category가 categories에 속하는 모든 News 조회
  findByCategories = async (categories: object) => {
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

  // 추천 뉴스 조회
  findRecommendNews() {
    return this.createQueryBuilder('news')
      .leftJoinAndSelect("news.tags", "tags")
      .where('tags.name = :name', { name: '딜리버블 추천' })
      .getMany();
  }

  // newsId가 일치하는 News의 모든 정보 조회
  findNewsDetail(newsId: number) {
    return this.createQueryBuilder('news')
      .leftJoinAndSelect("news.tags", "tags")
      .leftJoinAndSelect("news.scripts", "scripts")
      .where('news.id = :newsId', { newsId })
      .getOne();
  }

}
