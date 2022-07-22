import {Script} from "./types/ScriptInterface";
import {Time} from "../../vo/Time";

export class ScriptReturnDto {
    constructor(script: Script) {
        this.id = script.id;
        this.startTime = Time.toNumber(script.startTime);
        this.endTime = Time.toNumber(script.endTime);
        this.text = script.text;
    }

    id: number;
    startTime: number;
    endTime: number;
    text: string;
}