import { StyleSheet } from "react-native";
import { blue, border_purple, dark_purple, dark_purple4, gray, light_blue, purple } from "./baseStyle.ts";

export const loginStyles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	innerContainer: {
		height: "60%",
		width: "50%",
		borderColor:purple,
		borderWidth: 1,
		borderRadius:10,
		justifyContent: "space-evenly",
		alignItems: "center",
		flexDirection:"column",
		padding:20,
		backgroundColor:dark_purple,
	},
	title:{
		fontSize:30,
	},
	input:{
		backgroundColor:dark_purple4,
		// borderColor:border_purple,
		borderRadius:5,
		// borderWidth:1,
		height:40,
		width:"100%",
	},
	passwordContainer:{
		flexDirection: 'row',
		width:"100%",
	},
	eyeIcon: {
		position: 'absolute',
		right: 10,
		top:12
	},
	submitButton:{
		backgroundColor:blue,
		justifyContent:"center",
		alignItems:"center",
		paddingVertical:10,
		borderRadius:5,
		borderWidth:1,
		borderColor:light_blue,
		marginBottom:10,
	},
})
