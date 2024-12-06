import { View } from "react-native";
import { PressableView } from '../../ViewTochable.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faAnglesLeft,
	faAnglesRight,
	faArrowLeft, faArrowRight,
	faChevronLeft, faCircleNotch,
	faGear, faPause,
	faPlay
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from '@react-navigation/native';
import { Episode } from '../../../types/episodeType.ts';
import { useEffect, useState } from "react";
import { configStyle } from "../../../styles/playerStyle.ts";
import TextFont from "../../TextFont.tsx";
import { VideoRef } from "react-native-video";
import Slider from '@react-native-community/slider';
import {
	gray,
	orange,
	pink,
	white
} from "../../../styles/baseStyle.ts";
import Spinner from "../../Spinner.tsx";
import { getEpTime } from "../../../functions/animeFunctions.ts";
import { ipApi } from "../../../consts.ts";
import Orientation from "react-native-orientation-locker";
import ConfigPlayer from "./ConfigPlayer.tsx";

interface Props{
	ep:Episode|undefined
	animename:string
	seasonname:string
	videoRef: React.RefObject<VideoRef>;
	isloading:boolean
	selectedQuality:'1080'|'720'|'480';
	setSelectedQuality:React.Dispatch<React.SetStateAction<'1080'|'720'|'480'>>;
	currentTime:number;
	setSelectedCaption:React.Dispatch<React.SetStateAction<string>>;
	selectedCaption:string;
	currentSubtitles:string[];
	getCaptions:(selectedCaptionUrl:string)=>Promise<void>;
	isOnIntro:boolean;
	isOnOutro:boolean;
}
const PlayerControls:React.FunctionComponent<Props> = (
	{
		ep,
		animename,
		seasonname,
		videoRef,
		isloading,
		selectedQuality,
		setSelectedQuality,
		currentTime,
		setSelectedCaption,
		selectedCaption,
		currentSubtitles,
		getCaptions,
		isOnIntro,
		isOnOutro
	})=>{
	const navigation = useNavigation();
	const [pressed, setPressed] = useState(true);
	const [isPaused,setIsPaused] = useState(false);
	
	// const [ep,setEp] = useState<Episode>();
	
	const [configPressed, setConfigPressed] = useState(true);
	
	// const [currentSubtitles, setCurrentSubtitles] = useState<string[]>(['']);
	useEffect(() => {
		// const fetchData = async() =>{
			
		// };
		// fetchData();
		Orientation.lockToLandscape();
		if(ep){
		}
		
		// console.log(videoRef.current);

	}, [videoRef]);
	// useEffect(() => {
	// 	const interval = setInterval(async () => {
	// 		if (videoRef.current) {
	// 			try {
	// 				const time = await videoRef.current.getCurrentPosition();
	// 				setCurrentTime(time);
	// 			} catch (error) {
	// 				console.error('Error getting current time:', error);
	// 			}
	// 		}
	// 	}, 500);
	//
	// 	return () => clearInterval(interval);
	// }, [videoRef]);
	
	// useEffect(()=>{
	// 	let animationFrameId: number;
	// 	const updateSubtitles = async () => {
	// 		if (videoRef.current) {
	// 			try {
	// 				const time = await videoRef.current.getCurrentPosition();
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
	const handlePause = () =>{
		console.log(!isPaused?"pausado":"nao pausado")
		if(pressed){
			if(!isPaused) {
				videoRef.current!.pause()
			}else{
				videoRef.current?.resume()
			}
			setIsPaused(!isPaused);
		}
	}
	const handlePreviousEp = () =>{
		// console.log(eps.get(ep!.epindex-1));
		navigation.navigate("Watch" as never,{episode:eps?.get(ep!.epindex-1),animename,seasonname} as never)
	}
	const handleNextEp = () =>{
		// console.log(eps?.get(ep!.epindex+1));
		navigation.navigate("Watch" as never,{episode:eps?.get(ep!.epindex+1),animename,seasonname} as never)
	}
	const handleFoward = () =>{
		videoRef.current?.seek(currentTime + 10);
	}
	const handleBack = () =>{
		videoRef.current?.seek(currentTime - 10);
	}
	return(
		<>
			<PressableView onPress={()=>{setPressed(!pressed)}} style={[configStyle.overlayContainer,{opacity:pressed ? 1 : 0}]}>
				<View style={configStyle.topContainer}>
					<PressableView onPress={()=>navigation.goBack()}>
						<FontAwesomeIcon icon={faChevronLeft} size={20} color={white} />
					</PressableView>
					<View style={{justifyContent:'center', alignItems:'center'}}>
						{/*<PressableView onPress={()=>navigation.navigate("Anime" as never,{animeId:epS.animeid} as never)}>*/}
						{/*	<TextFont style={{fontSize:18}}>{animename}</TextFont>*/}
						{/*</PressableView>*/}
						<TextFont style={{fontSize:16}}>{seasonname}</TextFont>
						<TextFont style={{fontSize:18}}>{ep?.name}</TextFont>
					</View>
					<PressableView onPress={()=>{setConfigPressed(!configPressed)}}>
						<FontAwesomeIcon icon={faGear} size={20} color={white} />
					</PressableView>
				</View>
				<View style={configStyle.centerContainer}>
					{!isloading ? (
						<>
							{/*<PressableView style={configStyle.playButton} onPress={handlePreviousEp}>*/}
							{/*	<FontAwesomeIcon icon={faArrowLeft} size={25} color="white" />*/}
							{/*</PressableView>*/}
							<PressableView style={configStyle.playButton} onPress={handleBack}>
								<FontAwesomeIcon icon={faAnglesLeft} size={25} color="white" />
							</PressableView>
						</>
					):<></>}
					{!isloading ? (
						<PressableView style={configStyle.playButton} onPress={handlePause}>
							<FontAwesomeIcon icon={isPaused ? faPlay : faPause} size={25} color="white" />
						</PressableView>
					) : (
						<View style={configStyle.playButton}>
							<Spinner icon={faCircleNotch} size={25} color={white}/>
						</View>
					)}
					{!isloading ? (
						<>
							<PressableView style={configStyle.playButton} onPress={handleFoward}>
								<FontAwesomeIcon icon={faAnglesRight} size={25} color="white" />
							</PressableView>
							{/*<PressableView style={configStyle.playButton} onPress={handleNextEp}>*/}
							{/*	<FontAwesomeIcon icon={faArrowRight} size={25} color="white" />*/}
							{/*</PressableView>*/}
						</>
					):<></>}
				</View>
				<View style={configStyle.bottomContainer}>
					<Slider
						style={{
							width:'90%',
							// borderWidth:1,
							// borderColor:white,
						}}
						value={currentTime}
						minimumValue={0}
						maximumValue={ep?.duration!}
						minimumTrackTintColor={orange}
						maximumTrackTintColor={gray}
						thumbTintColor={pink}
						onValueChange={(n)=>pressed ? videoRef.current?.seek(n) : console.log("cu")}
					/>
					<TextFont>{getEpTime(currentTime)} / {getEpTime(ep?.duration!)}</TextFont>
					<PressableView style={{
						margin:10,
						borderWidth:1,
						borderColor:white,
						borderRadius:10,
						padding:5,
						display: isOnIntro ? 'flex' : 'none',
					}} onPress={()=>{videoRef.current?.seek(ep?.openingend!)}}>
						<TextFont>Passar intro</TextFont>
					</PressableView>
					<PressableView style={{
						margin:10,
						borderWidth:1,
						borderColor:white,
						borderRadius:10,
						padding:5,
						display: isOnOutro ? 'flex' : 'none',
					}} onPress={()=>{}}>
						<TextFont>Proximo Episodio</TextFont>
					</PressableView>
				</View>
			</PressableView>
			<PressableView onPress={()=>setPressed(!pressed)} style={[{
				height:!pressed ? '70%' : '20%',
				bottom:pressed ? '20%' : 0
			},configStyle.subtitleContainer]}>
				{currentSubtitles.map((subtitle, index) => (
					<TextFont style={configStyle.subtitle} key={index}>{subtitle}</TextFont>
				))}
			</PressableView>
			{ep?.resolution ?
				<ConfigPlayer
					pressed={configPressed}
					setPressed={setConfigPressed}
					qualitys={ep?.resolution!}
					quality={selectedQuality}
					setQuality={setSelectedQuality}
					captions={ep?.subtitlestracks!}
					selectedCaptions={selectedCaption}
					setSelectedCaption={setSelectedCaption}
					getCaptions={getCaptions}
				/>
			:<></>}
		</>
	);
};
export default PlayerControls;
