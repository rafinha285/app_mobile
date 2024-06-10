import { FC, useState } from "react";
import { PressableView } from "./ViewTochable.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import TextFont from "./TextFont.tsx";
import { animeEpisodeComponentStyle } from "../styles/animeScreen.ts";
import { white } from "../styles/baseStyle.ts";
import { faDownload, faPlay } from "@fortawesome/free-solid-svg-icons";

interface Props {
	typeButton:"seen"|"watch"|"download",
	onPress: ()=>void,
}
const AnimeEpisodeButton: FC<Props> = ({typeButton,onPress}) =>{
	switch(typeButton){
		case "seen":
			return(
				<PressableView style={animeEpisodeComponentStyle.button} onPress={onPress}>
					<FontAwesomeIcon color={white} icon={faEye}/>
					<TextFont> Visto</TextFont>
				</PressableView>
			)
		case "watch":
			return(
				<PressableView style={animeEpisodeComponentStyle.button} onPress={onPress}>
					<FontAwesomeIcon color={white} icon={faPlay}/>
					<TextFont> Assistir</TextFont>
				</PressableView>
			)
		case "download":
			return(
				<PressableView style={animeEpisodeComponentStyle.button} onPress={onPress}>
					<FontAwesomeIcon color={white} icon={faDownload}/>
					<TextFont> Download</TextFont>
				</PressableView>
			)
	}
	
}
export default AnimeEpisodeButton;
