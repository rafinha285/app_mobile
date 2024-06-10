import React, { FC } from "react";
import TextFont from "./TextFont.tsx";
import { ScrollView, View } from "react-native";
import { animeStyle } from "../styles/animeScreen.ts";
import Gen from "./Gen.tsx";
import { Producer } from "../types/producers.ts";
import { white } from "../styles/baseStyle.ts";

interface props{
	gens:string[]|Producer[],
	label:string,
	type:"gen"|"prod"|"stud"|"crea"
}
const AnimeProdList:FC<props> = ({gens, label, type}) => {
	// console.log(gens,type)
	
	return(
		<View style={{flexDirection: 'row',alignItems:'center',marginVertical: 5}}>
			<TextFont>{label}: </TextFont>
			<ScrollView horizontal={true} style={animeStyle.genDiv}>
				{gens.map((value, index) => (
					<Gen type={type} key={index} name={typeof value === 'object' ? value.name : value as string}></Gen>
				))}
			</ScrollView>
		</View>
	)
}
export default AnimeProdList;
