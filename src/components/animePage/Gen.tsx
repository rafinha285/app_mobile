import { FC } from "react";
import { View } from "react-native";
import TextFont from "../TextFont.tsx";
import { genStyles } from "../../styles/genStyle.ts"
import { PressableView } from "../ViewTochable.tsx";

interface Props {
	name: string;
	type:"gen"|"prod"|"stud"|"crea"
}
const Gen : FC<Props> = ({name,type}) =>{
	const push = () =>{
		console.log(name,type)
	}
	return(
		<PressableView onPress={push} style={genStyles.container}>
			<TextFont>{name}</TextFont>
		</PressableView>
	)
}
export default Gen;
