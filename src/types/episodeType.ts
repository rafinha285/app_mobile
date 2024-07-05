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
export interface IncomingEpisode{
    animeid:string;
    animename:string;
    date_added:Date;
    duration:number;
    id:string;
    name:string;
    resolution:string[],
    seasonid:string;
    seasonname:string;
}
