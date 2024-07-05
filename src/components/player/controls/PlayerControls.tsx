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
// import Slider from "react-native-slider";
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
import config from "../../Config.tsx";
import ConfigPlayer from "./ConfigPlayer.tsx";
// import { white } from "../../../styles/baseStyle.ts";

interface Props{
	epS:Episode
	animename:string
	seasonname:string
	videoRef: React.RefObject<VideoRef>;
	isloading:boolean
	selectedQuality:'1080'|'720'|'480';
	setSelectedQuality:React.Dispatch<React.SetStateAction<'1080'|'720'|'480'>>;
}
const PlayerControls:React.FunctionComponent<Props> = (
	{
		epS,
		animename,
		seasonname,
		videoRef,
		isloading,
		selectedQuality,
		setSelectedQuality
	})=>{
	const navigation = useNavigation();
	const [pressed, setPressed] = useState(true);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [isPaused,setIsPaused] = useState(false);
	const [eps,setEps] = useState<Map<number,Episode>>(new Map());
	const [ep,setEp] = useState<Episode>();
	const [selectedCaption,setSelectedCaption] = useState<string>("");
	const [configPressed, setConfigPressed] = useState(true);
	useEffect(() => {
		const fetchData = async() =>{
			await fetch(`${ipApi}/g/s/eps/${epS.animeid}/${epS.seasonid}`).then(res=>res.json()).then((data:Episode[])=> {
				// console.log(data)
				var map = new Map<number,Episode>();
				data.sort((a,b)=>a.epindex-b.epindex);
				for(let i = 0; i < data.length; i++){
					map.set(i+1,data[i]);
					// console.log(i+1)
				}
				// console.log(map)
				setEps(map);
			});
			await fetch(`${ipApi}/g/eps/${epS.animeid}/${epS.seasonid}/${epS.id}`).then(res=>res.json()).then((data:Episode) => {
				setEp(data);
				console.log(data)
			})
		};
		fetchData();
		Orientation.lockToLandscape();
		if(ep){
		}
		// console.log(videoRef.current);
		const interval = setInterval(async () => {
			if (videoRef.current) {
				const time = await videoRef.current.getCurrentPosition();
				setCurrentTime(time);
			}
		}, 10); // Atualiza a cada 10 milisegundos
		return () => clearInterval(interval);
	}, [videoRef]);
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
						<TextFont style={{fontSize:18}}>{epS.name}</TextFont>
					</View>
					<PressableView onPress={()=>{setConfigPressed(!configPressed)}}>
						<FontAwesomeIcon icon={faGear} size={20} color={white} />
					</PressableView>
				</View>
				<View style={configStyle.centerContainer}>
					{!isloading ? (
						<>
							<PressableView style={configStyle.playButton} onPress={handlePreviousEp}>
								<FontAwesomeIcon icon={faArrowLeft} size={25} color="white" />
							</PressableView>
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
							<PressableView style={configStyle.playButton} onPress={handleNextEp}>
								<FontAwesomeIcon icon={faArrowRight} size={25} color="white" />
							</PressableView>
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
						maximumValue={epS.duration!}
						minimumTrackTintColor={orange}
						maximumTrackTintColor={gray}
						thumbTintColor={pink}
						onValueChange={(n)=>pressed ? videoRef.current?.seek(n) : console.log("cu")}
					/>
					<TextFont>{getEpTime(currentTime)} / {getEpTime(epS.duration!)}</TextFont>
				</View>
			</PressableView>
			<View style={{
				position:"absolute",
				borderWidth:1,
				borderColor:white,
				width:'100%',
				height:pressed ? '20%' : '30%',
				bottom:pressed ? '20%' : 0
			}}>
			</View>
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
				/>
			:<></>}
		</>
	);
};
export default PlayerControls;
