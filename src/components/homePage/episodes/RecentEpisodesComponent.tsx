import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { PressableView } from "../../ViewTochable.tsx";
import FastImage from "react-native-fast-image";
import { cdnUrl, ipApi } from "../../../consts.ts";
import { Episode, IncomingEpisode } from "../../../types/episodeType.ts";
import { recentEpisodeComponentStyle, recentEpisodesStyle } from "../../../styles/homeStyle.ts";
import TextFont from "../../TextFont.tsx";
import QualityLabel from "../../QualityLabel.tsx";
import { gray, white } from "../../../styles/baseStyle.ts";
import { getEpTime } from "../../../functions/animeFunctions.ts";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
interface Props {
	episode:IncomingEpisode
}
const RecentEpisodesComponent:React.FC<Props> = ({episode}) => {
	const navigation = useNavigation();
	const [seasonName, setSeasonName] = useState("");
	useEffect(() => {
		
		const fetchData = async() =>{
			// console.log(`${ipApi}/g/ani/name/${episode.animeid}`)
			// await fetch(`${ipApi}/g/ani/name/${episode.animeid}`).then(res=>res.json()).then(data=>
			// {
			// 	// console.log(data.name);
			// 	setAnimeName(data.name);
			// });
			await fetch(`${ipApi}/g/sea/name/${episode.animeid}/${episode.seasonid}`).then(res=>res.json()).then(data=> {
				// console.log(data);
				setSeasonName(data.name);
			});
		}
		fetchData()
		// console.log(`${cdnUrl}/epPoster/${episode.animeid}/${episode.seasonid}/${episode.id}`);
	}, []);
	const handlePress = () =>{
		console.log((episode as never), episode,seasonName);
		navigation.navigate("Watch" as never, {
			episode,
			animename:episode.animename,
			seasonname:episode.seasonname
		} as never);
	}
	return(
		<PressableView onPress={handlePress} style={recentEpisodeComponentStyle.container}>
			<FastImage
				source={{uri:`${cdnUrl}/ep/${episode.animeid}/${episode.seasonid}/${episode.id}/${episode.id}.jpg`}}
				style={recentEpisodeComponentStyle.img}
			></FastImage>
			<View style={[recentEpisodeComponentStyle.top,recentEpisodeComponentStyle.topBottom]}>
				<TextFont>{episode.animename}</TextFont>
				<TextFont style={{fontSize:12}}>{seasonName}</TextFont>
				<TextFont style={{fontSize:11}}>{episode.name}</TextFont>
			</View>
			<View style={[recentEpisodeComponentStyle.top,recentEpisodeComponentStyle.toptop]}>
				<QualityLabel quality={episode.resolution[0].toString()}/>
				<View style={{flexDirection: "row",alignItems:'center'}}>
					<TextFont>{getEpTime(episode.duration!)} </TextFont>
					<FontAwesomeIcon icon={faClock} color={white}/>
				</View>
			</View>
		</PressableView>
	)
}
export default RecentEpisodesComponent;

