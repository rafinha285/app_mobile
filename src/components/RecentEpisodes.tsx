import React from "react";
import { ScrollView, Text, View } from "react-native";
import { recentEpisodesStyle } from "../styles/homeStyle.ts";

const RecentEpisodes:React.FC = () => {
	return(
		<View style={recentEpisodesStyle.container}>
			<View>
				<Text style={recentEpisodesStyle.title}>Episodios</Text>
			</View>
			<ScrollView style={recentEpisodesStyle.innerContainer}>
			
			</ScrollView>
		</View>
	)
}
export default RecentEpisodes;
