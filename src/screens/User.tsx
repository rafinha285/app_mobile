import { FC } from "react";
import { ScrollView, View } from "react-native";
import { homeStyle } from "../styles/homeStyle.ts";
import Header from "../components/homePage/Header.tsx";
import TextFont from "../components/TextFont.tsx";

const User:FC = () =>{
	return<ScrollView style={homeStyle.body}>
		<Header/>
		<TextFont>User</TextFont>
		<View>
			<TextFont>Downloads</TextFont>
		</View>
	</ScrollView>
}
export default User;
