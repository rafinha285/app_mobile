import { Episode } from "../types/episodeType.ts";
import { Season } from "../types/seasonType.ts";
import { Anime } from "../types/anime";
import { ipBase } from "../consts.ts";

export const fetchEp =async(ani:Anime,s:Season)=>{
	const res = await fetch(`${ipBase}/ep/g/season/${ani.id}/${s.id}`)
	const data: Episode[] = await res.json();
	return data
}
