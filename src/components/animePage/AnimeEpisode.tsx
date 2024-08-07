import { FC } from "react";
import { View } from "react-native";
import TextFont from "../TextFont.tsx";
import { Episode } from "../../types/episodeType.ts";
import { animeEpisodeComponentStyle } from "../../styles/animeScreen.ts";
import AnimeEpisodeButton from "./episode/AnimeEpisodeButton.tsx";
import { trim } from "../../functions/stringsFuncions.ts";
import { gray } from "../../styles/baseStyle.ts";
import { useGlobalContext } from "../../GlobalProvider.tsx";

interface AnimeEpisodeProps {
	episode:Episode
	watchHandle:(ep:Episode)=>void;
}
const AnimeEpisode:FC<AnimeEpisodeProps> = ({episode, watchHandle}) => {
	const { isLogged } = useGlobalContext();
	// console.log(episode);
	const seenHandle = () =>{
		console.log("seen")
	}
	const downloadHandle = () =>{
		console.log("download")
	}
	return(
		<View style={animeEpisodeComponentStyle.container}>
			<View style={[animeEpisodeComponentStyle.textDiv,{borderBottomWidth:1,borderBottomColor:gray}]}>
				<TextFont style={animeEpisodeComponentStyle.text}>{trim(episode.name,45)}</TextFont>
			</View>
			<View style={[animeEpisodeComponentStyle.textDiv,{flexDirection:"row",justifyContent:"space-evenly"}]}>
				{isLogged ? <AnimeEpisodeButton typeButton={"seen"} onPress={seenHandle}/> : <></>}
				<AnimeEpisodeButton typeButton={"watch"} onPress={()=>watchHandle(episode)}/>
				<AnimeEpisodeButton typeButton={"download"} onPress={downloadHandle}/>
			</View>
		</View>
	)
}
export default AnimeEpisode;
