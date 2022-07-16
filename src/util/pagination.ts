import { Logger } from "tslog";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

export const getLastPage = (listSize: number, totalCount: number): number =>  {
    return Math.ceil(totalCount / listSize);
}
