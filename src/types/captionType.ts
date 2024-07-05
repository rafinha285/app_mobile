export class Caption{
	text!:string;
	inicial!:number;
	final!:number;
	
	constructor(text:string,inicial:number,final:number) {
		this.text = text;
		this.inicial = inicial;
		this.final = final;
	}
	
	setText(val:string){
		this.text = val;
	}
	getText(){
		return this.text;
	}
	
	setInicial(val:number){
		this.inicial = val;
	}
	getInicial(){
		return this.inicial;
	}
	
	setFinal(val:number){
		this.final = val;
	}
	getFinal(){
		return this.final;
	}
}
