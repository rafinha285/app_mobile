import { languages } from "./type.ts";

export interface Episode{
    id:string
    epindex:number;
    name:string;
    animeid:string;
    releasedate:Date;
    views?:number;
    duration?:number;
    openingstart:number;
    openingend:number;
    ending:number;
    audiotracks:languages[];
    subtitlestracks?:string[];
    seasonid:string
    resolution:string[]
}
