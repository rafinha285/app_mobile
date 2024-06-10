import {character} from './characterType';
import {Season} from './seasonType';
import {Audio, quality} from './type.ts';
import {types} from 'cassandra-driver';

export interface anime {
    id:string;
    name:string;
    name2: string;
    description:string;
    quality:quality;
    language:Audio;
    state:string;
    releasedate:Date;
    studios:types.Tuple[]|string[][]|string[];
    producers:types.Tuple[]|string[][]|string[];
    creators:types.Tuple[]|string[][]|string[];
    genre:string[];
    seasons?:Season[]|types.Tuple[];
    rating?:number;
    characters?:character[];
    // path?:string;
    averageeptime?:number;
    date_added?:Date;
}
