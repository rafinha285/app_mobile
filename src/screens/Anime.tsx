import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {homeStyle} from '../styles/homeStyle';
import Header from '../components/Header';
import FastImage from 'react-native-fast-image';
import { useRoute } from "@react-navigation/native";
import { AnimeTabScreenProps } from "../types/navigationTypes";
import { ipApi } from "../consts.ts";
import { anime } from '../types/anime';
import { animeStyle } from "../styles/animeScreen.ts";
import HeartButton from "../components/HeartButton.tsx";
import { PressableView } from "../components/ViewTochable.tsx";
import TextFont from "../components/TextFont.tsx";
import AnimeProdList from "../components/AnimeProdList.tsx";
import { getEpTime, tupleToProducer, tupleToSeason } from "../functions/animeFunctions.ts";
import Loading from "../components/Loading.tsx";
import { getMonthName } from "../functions/stringsFuncions.ts";
import AddAnimeListButton from "../components/AddAnimeListButton.tsx";
import { Picker } from "@react-native-picker/picker";
import { types } from "cassandra-driver";
import { Episode } from "../types/episodeType.ts";
import { Season } from "../types/seasonType.ts";
import AnimeEpisode from "../components/AnimeEpisode.tsx";


const Anime = () => {
	const route = useRoute<AnimeTabScreenProps<"animePage">["route"]>();
	const aniId = route.params.animeId;
	const [animee,setAnimee] = useState<anime>();
	const [selectedSeason, setSelectedSeason] = useState<string>();
	const [episodes, setEpisodes] = useState<Episode[]>([]);
	const aniImgUrl = `${ipApi}/ani/img?Id=${aniId}`
	useEffect(() => {
		fetch(`${ipApi}/ani/${aniId}`).then(res => res.json()).then((res:anime) => setAnimee(res));
		// console.log(route.params.animeId);
		if(animee){
			// console.log(typeof tupleToProducer(animee?.producers!));
			animee.seasons = tupleToSeason(animee.seasons as types.Tuple[]);
			console.log(animee.seasons[0].id)
			setSelectedSeason(animee.seasons[0].id);
			const fetchEpisodes = async () => {
				const episodesTemp = [];
				for (const seaso of animee.seasons || []) {
					for (const episode of (seaso as Season).episodes || []) {
						let season = seaso as Season
						const response = await fetch(`${ipApi}/g/eps/${animee.id}/${season.id}/${episode}`);
						if (response.ok) {
							const data = await response.json();
							episodesTemp.push(data);
						} else {
							console.error(`Erro ao buscar episódios da temporada ${season.id}`);
						}
					}
				}
				setEpisodes(episodesTemp);
			};
			fetchEpisodes();
			// console.log(episodes);
		}
		
	}, [!animee]);
	const [descBool, setDescBool] = useState(false);
	const descHandle = () =>{
		setDescBool(!descBool);
		// console.log(descBool);
	}
	
	return (
		<ScrollView style={[homeStyle.body]}>
			<Header></Header>
			{animee?(
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
						<TextFont style={animeStyle.title}>{animee?.name}</TextFont>
						{animee?.name2 ? <TextFont style={animeStyle.name2}>{animee?.name2}</TextFont> : <></>}
					</View>
					<HeartButton/>
				</View>
				<PressableView onPress={descHandle} style={[animeStyle.descDiv,descBool ? {height:undefined} : {height:105}]}>
					<TextFont style={animeStyle.descText}>{animee?.description}</TextFont>
				</PressableView>
				<View style={animeStyle.details}>
					{/*Generos*/}
					<AnimeProdList type={"gen"} gens={animee?.genre!} label="Generos"/>
					<AnimeProdList type={"prod"} gens={tupleToProducer(animee?.producers!)} label="Produtores"/>
					<AnimeProdList type={"stud"} gens={tupleToProducer(animee?.studios!)} label="Produtores"/>
					<AnimeProdList type={"crea"} gens={tupleToProducer(animee?.creators!)} label="Produtores"/>
					<TextFont style={animeStyle.detailsText}>Duração media: {getEpTime(animee.averageeptime!)}</TextFont>
					<TextFont style={animeStyle.detailsText}>Idioma: {animee.language}</TextFont>
					<View style={{flexDirection:"row"}}>
						<TextFont style={animeStyle.detailsText}>Data de Lançamento: </TextFont>
						<TextFont style={animeStyle.detailsText}>{new Date(animee.releasedate).getDate().toString()} </TextFont>
						<TextFont style={animeStyle.detailsText}>de </TextFont>
						<TextFont style={animeStyle.detailsText}>{getMonthName(new Date(animee.releasedate),false)} </TextFont>
						<TextFont style={animeStyle.detailsText}>de </TextFont>
						<TextFont style={animeStyle.detailsText}>{new Date(animee.releasedate).getFullYear().toString()}</TextFont>
					</View>
					{/*</TextFont>*/}
					<TextFont style={animeStyle.detailsText}>Qualidade: {animee.quality}</TextFont>
					<AddAnimeListButton/>
				</View>
				<View>
					<View style={animeStyle.seasonSelectDiv}>
						<View style={animeStyle.seasonSelect}>
							<Picker style={{width:"100%"}} selectedValue={selectedSeason} onValueChange={(e)=> {
								// console.log(e)
								setSelectedSeason(e);
							}}>
								{tupleToSeason(animee.seasons! as types.Tuple[])!.map((v,i)=>(
									<Picker.Item label={v.name} value={v.id} key={i}></Picker.Item>
								))}
							</Picker>
						</View>
					</View>
					<View style={animeStyle.seasonSelectDiv}>
						{episodes!
							.filter(episode=>episode.seasonid === selectedSeason)
							.sort((a,b)=>a.epindex-b.epindex)
							.map((v,i)=> {
								// console.log(v)
								return <AnimeEpisode episode={v} key={i} />
							})
						}
					</View>
				</View>
			</View>) : (<Loading/>)}
			{/*<RecentEpisodes/>*/}
		</ScrollView>
		
	);
};

export default Anime;

// const styles = StyleSheet.create({})
