// src/repository/MotivationRepository/index.ts

import { EntityRepository, Repository } from 'typeorm';
import { News } from '../entity/News';
import { NewsInfo } from '../types';

@EntityRepository(News)
export class NewsRepository extends Repository<News> {}
