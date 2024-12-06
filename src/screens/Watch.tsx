import React, { FC, useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WatchTabScreenProps } from "../types/navigationTypes";
import { homeStyle } from "../styles/homeStyle.ts";
import Video, { TextTracks, TextTrackType, VideoRef } from "react-native-video";
import Orientation from "react-native-orientation-locker";
import { Episode } from "../types/episodeType.ts";
import { languageMap } from "../functions/stringsFuncions.ts";
import { cdnUrl, ipApi } from "../consts.ts";
import type { OnProgressData } from "react-native-video/src/specs/VideoNativeComponent.ts";
import { Anime } from "../types/anime";
import { Season } from "../types/seasonType.ts";
import { tupleToSeason } from "../functions/animeFunctions.ts";
import PlayerControls from "../components/player/controls/PlayerControls.tsx";
import absoluteFill = StyleSheet.absoluteFill;
import parser from "../functions/VTTfunction.ts";
import { VTTCaptionType } from "../types/captionType.ts";
import { handleProgress } from "../hooks/onTimeChange.ts";
// import Header from "../components/Header.tsx";

const Watch:FC = () =>{
	const videoRef = useRef<VideoRef>(null);
	// videoRef.current.
	const route = useRoute<WatchTabScreenProps<'watchPage'>['route']>();
	// console.log(route.params);
	const animename:string = route.params.animename;
	const seasonname:string = route.params.seasonname;
	const ep:Episode = route.params.episode;
	
	const [anime,setAnime] = useState<Anime>();
	const [season,setSeason] = useState<Season>();
	const [episode,setEpisode] = useState<Episode>();
	const [eps,setEps] = useState<Map<number,Episode>>(new Map());
	
	const [loading,setLoading] = useState<boolean>(true);
	
	const [selectedQuality,setSelectedQuality] = useState<'1080'|'720'|'480'>('480')
	
	const [currentTime, setCurrentTime] = useState<number>(0);
	
	const [selectedCaption,setSelectedCaption] = useState<string>('por');
	const [subtitles, setSubtitles] = useState<VTTCaptionType[]>([]);
	const [currentSubtitles, setCurrentSubtitles] = useState<string[]>(['']);
	const [isOnIntro, setIsOnIntro] = useState<boolean>(false);
	const [isOnOutro, setIsOnOutro] = useState<boolean>(false);
	
	const getCaptions = async(selectedCaptionUrl:string) =>{
		const response = await fetch(`${cdnUrl}/ep/${ep?.animeid}/${ep?.seasonid}/${ep?.id}/${ep?.id}-${selectedCaptionUrl}.vtt`);
		console.log(response.status,`${cdnUrl}/ep/${ep?.animeid}/${ep?.seasonid}/${ep?.id}/${ep?.id}-${selectedCaptionUrl}.vtt`)
		const vttContent = await response.text();
		// @ts-ignore
		const parsedSubtitles = parser.fromVtt(vttContent, 's');
		setSubtitles(parsedSubtitles);
	}
	const fetchData = async()=>{
		await fetch(`${ipApi}/g/eps/${ep.animeid}/${ep.seasonid}/${ep.id}`).then(res=>res.json()).then((data:Episode) => {
			setEpisode(data);
			console.log(data);
		});
		await fetch(`${ipApi}/g/s/eps/${ep?.animeid}/${ep?.seasonid}`).then(res=>res.json()).then((data:Episode[])=> {
			console.log(data)
			var map = new Map<number,Episode>();
			data.sort((a,b)=>a.epindex - b.epindex);
			for(let i = 0; i < data.length; i++){
				map.set(i+1,data[i]);
				// console.log(i+1)
			}
			// console.log(map)
			setEps(map);
		});
	};
	useEffect(() => {
		if (ep.subtitlestracks) {
			console.log(`${cdnUrl}/stream/${ep.animeid}/${ep.seasonid}/${ep.id}/1080`)
			fetch(`${ipApi}/ani/${ep.animeid}`).then((res)=>res.json()).then(data=>setAnime(data))
			if(anime){
				setSeason(tupleToSeason(anime?.seasons!).find((v:Season)=>v.id === ep.seasonid))
			}
			// @ts-ignore
		}
		fetchData();
		getCaptions(selectedCaption);
		// Orientation.lockToLandscape();
		return () => {
			// Orientation.lockToPortrait();
			// Dimensions.removeEventListener('change', handleOrientationChange);
		};

	}, []);
	const handleLoadStart = () => {
		setLoading(true);
	};
	const handleLoad = () => {
		setLoading(false);
	};
	const handleBuffer = (isBuffering: boolean) => {
		setLoading(isBuffering);
	};
	
	
	// useEffect(()=>{
	// 	let animationFrameId: number;
	// 	const updateSubtitles = async () => {
	// 		if (videoRef.current) {
	// 			try {
	// 				const time = await videoRef.current.getCurrentPosition();
	// 				// console.log(time)
	// 				const activeSubtitles = subtitles.filter(subtitle =>
	// 					time >= subtitle.startTime && time <= subtitle.endTime
	// 				);
	// 				setCurrentSubtitles(activeSubtitles.map(subtitle => removeHtmlTags(subtitle.text)));
	// 			} catch (error) {
	// 				console.error('Error getting current position:', error);
	// 			}
	// 		}
	// 		animationFrameId = requestAnimationFrame(updateSubtitles);
	// 	};// Atualiza a cada 10 milisegundos
	// 	animationFrameId = requestAnimationFrame(updateSubtitles);
	// 	return () => cancelAnimationFrame(animationFrameId);
	// })
	// @ts-ignore
	return(
		<View style={[homeStyle.body,{flexGrow:1}]}>
			<View style={playerStyles.container}>
					<>
						<Video
							ref={videoRef}
							source={{uri:`${cdnUrl}/stream/${ep.animeid}/${ep.seasonid}/${ep.id}/${selectedQuality}`}}
							resizeMode={'contain'}
							fullscreen={true}
							style={absoluteFill}
							onLoadStart={handleLoadStart}
							onLoad={handleLoad}
							onBuffer={({ isBuffering }) => handleBuffer(isBuffering)}
							poster={`${cdnUrl}/ep/${ep.animeid}/${ep.seasonid}/${ep.id}/${ep.id}.jpg`}
							onProgress={(e)=>handleProgress(e, setCurrentSubtitles, setCurrentTime, subtitles,setIsOnIntro,setIsOnOutro,ep,eps)}
							// paused
						/>
						<PlayerControls
							ep={episode}
							animename={animename}
							seasonname={seasonname}
							videoRef={videoRef}
							isloading={loading}
							selectedQuality={selectedQuality}
							setSelectedQuality={setSelectedQuality}
							currentTime={currentTime}
							currentSubtitles={currentSubtitles}
							selectedCaption={selectedCaption}
							setSelectedCaption={setSelectedCaption}
							getCaptions={getCaptions}
							isOnIntro={isOnIntro}
							isOnOutro={isOnOutro}
						/>
					</>
			</View>
		</View>
	);
};
export default Watch;

const playerStyles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		backgroundColor:'black',
		elevation:1,
	},
});
