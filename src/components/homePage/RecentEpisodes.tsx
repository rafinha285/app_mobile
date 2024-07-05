import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { recentEpisodesStyle } from '../../styles/homeStyle.ts';
import TextFont from '../TextFont.tsx';
import { Episode } from '../../types/episodeType.ts';
import { ipApi } from '../../consts.ts';
import RecentEpisodesComponent from './episodes/RecentEpisodesComponent.tsx';

const RecentEpisodes:React.FC = () => {
	const [eps,setEps] = useState<Episode[]>([]);
	const fetchData = async () =>{
		await fetch(`${ipApi}/g/eps?count=8`).then(res=>{
			return res.json();
		}).then(data=> {
			// console.log(data);
			setEps(data);
		});
	};
	useEffect(() => {
		fetchData();
	}, []);
	return(
		<View style={recentEpisodesStyle.container}>
			<View>
				<TextFont style={recentEpisodesStyle.title}>Episodios</TextFont>
			</View>
			<View style={recentEpisodesStyle.innerContainer}>
				{eps.map((v,i)=>(
					<RecentEpisodesComponent episode={v} key={i}/>
				))}
			</View>
		</View>
	);
};
export default RecentEpisodes;
