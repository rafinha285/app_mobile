import { FC } from "react";
import { View } from "react-native";
import { PressableView } from "../ViewTochable.tsx";
import TextFont from "../TextFont.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { white } from "../../styles/baseStyle.ts";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { addAnimeListButtonStyle } from "../../styles/animeScreen.ts";

const addAnimeListButton:FC = () => {
	const handlePress = ()=>{
	
	}
	return(
		<PressableView style={addAnimeListButtonStyle.container} onPress={handlePress}>
			<TextFont style={{fontSize:20}}>Adicionar a lista </TextFont>
			<FontAwesomeIcon icon={faSquarePlus} color={white} size={20}/>
		</PressableView>
	)
}
export default addAnimeListButton;
