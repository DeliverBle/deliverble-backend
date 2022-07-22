import { News } from "../entity/News/News";
import { Script } from "../entity/Script/Script";
import { Time } from "../vo/Time";
import {Logger} from "tslog";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

// 뉴스 별 스크립트 생성

export const insertScriptData = async (connection) => {

      const scriptRepository = await Script.getRepository();
      const newsRepository = await News.getRepository();
;
      const scripts = [
        { 
          news_id: 1,
          startTime: new Time(6, 0),
          endTime: new Time(56, 0),
          text: 'test',
        },
      ];
  
      const scripts1 = scriptRepository.create(scripts);
      const scripts2 = await scriptRepository.save(scripts1);
      
      for (let i in scripts2) {
        const scripts3 = await scriptRepository.find({
          where: {
            id: scripts2[i].id,
          },
        });
        const news = await newsRepository.find({
          where: {
            id: scripts[i].news_id,
          },
        });
        log.debug(scripts[i].news_id);
        log.debug(news);
        // console.log(scripts1[i].news_id)
        // console.log(scripts2[i].news_id)
        log.debug(scripts3);
      }
  };

