import { FC, useEffect, useRef, useState } from "react";
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
import { anime } from "../types/anime";
import { Season } from "../types/seasonType.ts";
import { tupleToSeason } from "../functions/animeFunctions.ts";
import PlayerControls from "../components/player/controls/PlayerControls.tsx";
import absoluteFill = StyleSheet.absoluteFill;
// import Header from "../components/Header.tsx";

const Watch:FC = () =>{
	const videoRef = useRef<VideoRef>(null);
	// videoRef.current.
	const route = useRoute<WatchTabScreenProps<'watchPage'>['route']>();
	// console.log(route.params);
	const animename:string = route.params.animename;
	const seasonname:string = route.params.seasonname;
	const ep:Episode = route.params.episode;
	// eslint-disable-next-line @typescript-eslint/no-shadow
	const [anime,setAnime] = useState<anime>();
	const [season,setSeason] = useState<Season>();
	const [loading,setLoading] = useState<boolean>(true);
	const [selectedQuality,setSelectedQuality] = useState<'1080'|'720'|'480'>('480')
	// const [seasonEps,setSeasonEps] = useState<Episode[]>()
	useEffect(() => {
		if (ep.subtitlestracks) {
			const updatedCaptionsTracks = ep.subtitlestracks.map((track, index) => {
				// @ts-ignore
				const language = languageMap[track];
				if(language){
					let sub = {
						title: `Track ${index + 1}`,
						language: '' || language,
						type: 'text/vtt' as TextTrackType,
						uri: `${ipApi}/ep/${ep.animeid}/${ep.seasonid}/${ep.id}/${ep.id}-${track}.vtt`,
					};
					// console.log(sub);
					return sub;
				}else{
					return null;
				}
			}).filter(Boolean);
			console.log(`${cdnUrl}/stream/${ep.animeid}/${ep.seasonid}/${ep.id}/1080`)
			fetch(`${ipApi}/ani/${ep.animeid}`).then((res)=>res.json()).then(data=>setAnime(data))
			if(anime){
				setSeason(tupleToSeason(anime?.seasons!).find((v:Season)=>v.id === ep.seasonid))
			}
			if(season){
				let tempArr:Episode[] = []
				season.episodes.forEach((v)=>{
					fetch(`${ipApi}/`)
				})
			}
			// @ts-ignore
			// console.log(updatedCaptionsTracks());
			// setCaptionsTracks(updatedCaptionsTracks);
		}
		Orientation.lockToLandscape();
		// console.log(videoRef.current)
		// console.log(videoRef.current,`${cdnUrl}/ep/${anime?.id}/${season?.id}/${ep.id}/${ep.id}-por.vtt`)
		// Remove o ouvinte quando o componente é desmontado
		return () => {
			// Orientation.lockToPortrait();
			// Dimensions.removeEventListener('change', handleOrientationChange);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
		//ep.subtitlestracks,captionsTracks.length != 0,anime,season,seasonEps
	}, []);
	let porTextTrack:TextTracks = [{
		title:'Português',
		type:TextTrackType.VTT,
		language:'pt',
		uri:`${ipApi}/ep/${anime?.id}/${season?.id}/${ep.id}/${ep.id}-por.vtt`,
	}]
	const handleLoadStart = () => {
		setLoading(true);
	};
	const handleLoad = () => {
		setLoading(false);
	};
	const handleBuffer = (isBuffering: boolean) => {
		setLoading(isBuffering);
	};
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
							// paused
						/>
						<PlayerControls
							epS={ep}
							animename={animename}
							seasonname={seasonname}
							videoRef={videoRef}
							isloading={loading}
							selectedQuality={selectedQuality}
							setSelectedQuality={setSelectedQuality}
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
