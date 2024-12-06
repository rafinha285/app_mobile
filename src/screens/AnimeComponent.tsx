import { ScrollView, View } from 'react-native';
import React, { FC, useEffect, useState } from "react";
import {homeStyle} from '../styles/homeStyle';
import Header from '../components/homePage/Header.tsx';
import FastImage from 'react-native-fast-image';
import { useNavigation, useRoute } from "@react-navigation/native";
import { AnimeTabScreenProps } from "../types/navigationTypes";
import { cdnUrl, ipApi, ipBase } from "../consts.ts";
import { Anime } from '../types/anime';
import { animeStyle } from "../styles/animeScreen.ts";
import HeartButton from "../components/buttons/HeartButton.tsx";
import { PressableView } from "../components/ViewTochable.tsx";
import TextFont from "../components/TextFont.tsx";
import AnimeProdList from "../components/animePage/AnimeProdList.tsx";
import { getEpTime, tupleToProducer, tupleToSeason } from "../functions/animeFunctions.ts";
import Loading from "../components/Loading.tsx";
import { getMonthName } from "../functions/stringsFuncions.ts";
import AddAnimeListButton from "../components/buttons/AddAnimeListButton.tsx";
import { Picker } from "@react-native-picker/picker";
import { types } from "cassandra-driver";
import { Episode } from "../types/episodeType.ts";
import { Season } from "../types/seasonType.ts";
import AnimeEpisode from "../components/animePage/AnimeEpisode.tsx";
import Orientation from "react-native-orientation-locker";
import { Producer } from "../types/producers.ts";
import { fetchEp } from "../functions/episodeFunctions.ts";


const AnimeComponent:FC = () => {
	const route = useRoute<AnimeTabScreenProps<"animePage">["route"]>();
	const navigation = useNavigation();
	const aniId = route.params.animeId;
	const [anime,setAnime] = useState<Anime>();
	
	const [seasons,setSeasons] = useState<Season[]>([])
	const [producers,setProducers] = useState<Producer[]>([])
	const [creators,setCreators] = useState<Producer[]>([])
	const [studios,setStudios] = useState<Producer[]>([])
	
	interface EpisodeState{
		[seasonId:string]: Episode[]
	}
	const [episodes,setEpisodes] = useState<EpisodeState>({})
	
	const [selectedSeason, setSelectedSeason] = useState<string>("");
	const aniImgUrl = `${cdnUrl}/ani/img?Id=${aniId}`
	const [isEpisodeLoading,setIsEpisodeLoading] = useState<boolean>()
	
	useEffect(() => {
		Orientation.lockToPortrait()
		fetch(`${ipBase}/ani/g/${aniId}`).then(res => {
			return res.json();
		}).then((res:Anime) => {
			// console.log(res);
			setAnime(res);
		});
		// console.log(route.params.animeId);
		if(anime){
			const fetchPS = async()=>{
				await fetch(`${ipBase}/ani/g/prods/${anime.id}`)
					.then(response=>response.json())
					.then(data=>{
						setCreators(data.creators);
						setProducers(data.producers);
						setStudios(data.studios);
					})
				await fetch(`${ipBase}/ani/g/seasons/${anime.id}`)
					.then(response =>response.json())
					.then(data=>{
						console.log(data[0].id,data[0].episodes);
						data.forEach(async (element:Season) => {
							const fetchedEps = await fetchEp(anime,element);
							setEpisodes(prev=>({...prev,[element.id]:fetchedEps}));
						});
						setSeasons(data);
						setSelectedSeason(data[0].id)
					})
			}
			fetchPS()
		}
	}, [!anime]);
	const [descBool, setDescBool] = useState(false);
	const descHandle = () =>{
		setDescBool(!descBool);
		// console.log(descBool);
	}
	const watchHandle = (ep:Episode) =>{
		// console.log()
		navigation.navigate("Watch" as never,{
			episode:ep,
			animename:anime?.name,
			seasonname:tupleToSeason(anime!.seasons!).find(e=>e.id === selectedSeason)!.name,
		} as never);
	}
	return (
		<ScrollView style={[homeStyle.body]}>
			<Header></Header>
			{anime && seasons && episodes?(
			<View style={animeStyle.topView}>
				<FastImage
					style={[animeStyle.img,animeStyle.imgShadow]}
					source={{
						uri:aniImgUrl,
						priority:FastImage.priority.high,
					}}
				/>
				<View style={animeStyle.topText}>
					<View style={animeStyle.titleDiv}>
						<TextFont style={animeStyle.title}>{anime?.name}</TextFont>
						{anime?.name2 ? <TextFont style={animeStyle.name2}>{anime?.name2}</TextFont> : <></>}
					</View>
					<HeartButton/>
				</View>
				<PressableView onPress={descHandle} style={[animeStyle.descDiv,descBool ? {height:undefined} : {height:105}]}>
					<TextFont style={animeStyle.descText}>{anime?.description}</TextFont>
				</PressableView>
				<View style={animeStyle.details}>
					{/*Generos*/}
					<AnimeProdList type={"gen"} gens={anime?.genre!} label="Generos"/>
					{/*<AnimeProdList type={"prod"} gens={tupleToProducer(anime?.producers!)} label="Produtores"/>*/}
					{/*<AnimeProdList type={"stud"} gens={tupleToProducer(anime?.studios!)} label="Produtores"/>*/}
					{/*<AnimeProdList type={"crea"} gens={tupleToProducer(anime?.creators!)} label="Produtores"/>*/}
					<TextFont style={animeStyle.detailsText}>Duração media: {getEpTime(anime.averageeptime!)}</TextFont>
					<TextFont style={animeStyle.detailsText}>Idioma: {anime.language}</TextFont>
					<View style={{flexDirection:"row"}}>
						<TextFont style={animeStyle.detailsText}>Data de Lançamento: </TextFont>
						<TextFont style={animeStyle.detailsText}>{new Date(anime.releasedate).getDate().toString()} </TextFont>
						<TextFont style={animeStyle.detailsText}>de </TextFont>
						<TextFont style={animeStyle.detailsText}>{getMonthName(new Date(anime.releasedate),false)} </TextFont>
						<TextFont style={animeStyle.detailsText}>de </TextFont>
						<TextFont style={animeStyle.detailsText}>{new Date(anime.releasedate).getFullYear().toString()}</TextFont>
					</View>
					{/*</TextFont>*/}
					<TextFont style={animeStyle.detailsText}>Qualidade: {anime.quality}</TextFont>
					<AddAnimeListButton/>
				</View>
				<View>
					<View style={animeStyle.seasonSelectDiv}>
						<View style={animeStyle.seasonSelect}>
							<Picker style={{width:"100%"}} selectedValue={selectedSeason} onValueChange={(e)=> {
								// console.log(e)
								setSelectedSeason(e);
							}}>
								{seasons.sort((a,b)=>a.index-b.index).map((v,i)=>(
									<Picker.Item label={v.name} value={v.id} key={i}/>
								))}
							</Picker>
						</View>
					</View>
					<View style={animeStyle.seasonSelectDiv}>
						{seasons.map((season,i,arr)=> (
							<View key={season.index}>
								{episodes[season.id].map((episode,i)=>{
									const isVisible = episode.id === selectedSeason; // Verifica se o ID do episódio corresponde ao ID selecionado
									let comp = (
										<View
											key={episode.epindex}
											style={{
												display: isVisible ? 'flex' : 'none', // Define a visibilidade
											}}
										>
											<AnimeEpisode episode={episode} watchHandle={watchHandle} />
										</View>)
									// console.log(comp)
									return comp;
								})}
							</View>
						))}
					</View>
				</View>
			</View>) : (<Loading/>)}
			{/*<RecentEpisodes/>*/}
		</ScrollView>
		
	);
};

export default AnimeComponent;

// const styles = StyleSheet.create({})
