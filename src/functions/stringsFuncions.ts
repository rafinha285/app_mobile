import { languages } from '../types/type.ts';

export function trim(string:string,maxLength:number = 120):string{
	if(string.length<maxLength-3){
		return string;
	}
	var t = string.substring(0,maxLength-3)
	console.log(t,t.length,maxLength,Math.min(t.length,t.lastIndexOf(" ")))
	if(!(t.lastIndexOf(" ") == -1)){
		t = t.substring(0,Math.min(t.length,t.lastIndexOf(" ")))+"..."
		return t
	}
	return t.substring(0,t.length)
}
interface MonthNames {
	[key: string]: string[];
}
const monthNames:MonthNames={
	'pt-br': [
		'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
		'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
	],
}
export const getMonthName = (date:Date,short:boolean,locale = "pt-br"):string =>{
	const month = date.getMonth();
	const localeMonthNames = monthNames[locale];
	
	if (!localeMonthNames) {
		return '';
	}
	
	return short ? localeMonthNames[month].substring(0, 3) : localeMonthNames[month];
}
declare global{
	interface Date{
		getDayOfWeekName():string;
		daysOfWeek(language?:languages):string[];
	}
}
export function DateToStringInput(dat:Date):string{
	let date:Date = new Date(dat)
	return date.toISOString().split("T")[0]
}
export function DateToStringLocal(dat:Date){
	let date:Date = new Date(dat)
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // O mês é baseado em zero
	const year = date.getFullYear();
	console.log(`${day}/${month}/${year}`)
	
	// Retorna a data formatada como uma string
	return `${day}/${month}/${year}`;
}
// Date.prototype.dateToStringLocal = DateToStringLocal;

Date.prototype.getDayOfWeekName = function(){
	// const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
	let daysOfWeek = Date.prototype.daysOfWeek()
	const dayOfWeek = this.getDay(); // Retorna um número de 0 (Domingo) a 6 (Sábado)
	return daysOfWeek[dayOfWeek];
}
Date.prototype.daysOfWeek = (language:languages = languages.Portuguese) =>{
	switch (language) {
		case languages.Portuguese:
			return ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
		case languages.English:
			return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		case languages.Spanish:
			return ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']; // Dias da semana em espanhol
		case languages.Japanese:
			return ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']; // Dias da semana em japonês
		default:
			return ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']; // Padrão para idioma português
	}
}


export const languageMap = {
	eng: 'en',
	por: 'pt',
	spa: 'es',
	ara: 'ar',
	fre: 'fr',
	ger: 'de',
	ita: 'it',
	jpn: 'ja',
	pol: 'pl',
	dut: 'nl',
	nob: 'nb',
	fin: 'fi',
	tur: 'tr',
	swe: 'sv',
	gre: 'el',
	heb: 'he',
	rum: 'ro',
	ind: 'id',
	tha: 'th',
	kor: 'ko',
	dan: 'da',
	chi: 'zh',
	vie: 'vi',
	ukr: 'uk',
	hun: 'hu',
	cze: 'cs',
	hrv: 'hr',
	may: 'ms',
	fil: 'fil',
	hin: 'hi',
	// Adicione os outros códigos ISO 639-1 conforme necessário
};
