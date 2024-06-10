import { StyleSheet } from "react-native";
import { gray, red, white } from "./baseStyle.ts";

const buttonSize = 50;
export const padding = 10;
export const borderWidth = 2;
export const heartSize = 30

export const heartStyles = StyleSheet.create({
	div:{
		// width:'auto',
		display: "flex",
		padding:10,
		width:buttonSize,
		height:buttonSize,
		borderWidth:borderWidth,
		borderColor:white,
		borderRadius:buttonSize / 2,
		backgroundColor:gray,
		shadowColor:gray,
		shadowOffset:{width:0, height:3},
		shadowOpacity:0.7,
		shadowRadius: 5,
		elevation: 6,
	},
	selected:{
		backgroundColor:red,
	},
	button:{
		alignSelf:"center",
		justifyContent:"center",
		width:50,
		height:50,
	}
});
