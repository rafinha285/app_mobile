import { Producer } from "../types/producers.ts";
import { Season } from "../types/seasonType.ts";

export function tupleToProducer(data:any[]):Producer[]{
	return data.map(item =>({
		id:item[0],
		name:item[1]
	}))
}
export function getEpTime(ee:number):string{
	var e = Math.round(ee)
	var h = Math.floor(e/3600).toString()
	let m:string =""
	var s = (e%60).toString()
	var ar:string[] = []
	
	if (h === "0") {
		s = s.length === 1 ? (s = `0${s}`) : s;
		m = Math.floor((e % 3600) / 60).toString();
		m = m.length === 1 ? `0${m}` : m; // Correção aqui
		ar.push(m, s);
	} else {
		s= s.length === 1 ? (s = `0${s}`) : s;
		m = Math.floor((e % 3600) / 60).toString();
		m = m.length === 1 ? `0${m}` : m; // Correção aqui
		h= h.length === 1 ? (h = `0${h}`) : h;
		ar.push(h, m, s);
	}
	return ar.join(":");
}
export function tupleToSeason(data:any[]):Season[]{
	// console.log(data)
	if(data == null){
		return []
	}else{
		if(data[0].elements){
			let returndata:Season[] = data.map(item=>({
				id:item.elements[0],
				name:item.elements[1],
				episodes:item.elements[2],
				index:item.elements[3],
			}));
			console.log(returndata.toString())
			return returndata
		}else{
			let returndata:Season[] = data.map(item=>({
				id:item[0],
				name:item[1],
				episodes:item[2],
				index:item[3],
			}));
			return returndata;
		}
	}
}
