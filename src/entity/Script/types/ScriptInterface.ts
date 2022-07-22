import {Time} from "../../../vo/Time";

export interface Script {
    id: number;
    startTime: Time;
    endTime: Time;
    text: string;
}