import { CSSProperties } from "react";
import { StyleSheet } from "react-native";
import { dark_purple2, gray_dark, purple, white } from "./baseStyle.ts";

export const playerStyle = StyleSheet.create({
	fullScreen:{
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	controls: {
		position: 'absolute',
		bottom: 50,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
	},
	controlButton: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		padding: 10,
		borderRadius: 5,
	},
	controlButtonText: {
		color: 'white',
		fontSize: 16,
	},
})
export const configStyle = StyleSheet.create({
	overlayContainer: {
		flex: 1,
		flexGrow:1,
		flexDirection:'column',
		justifyContent: 'space-between',
		// alignItems: "center",
		// borderColor:white,
		// borderWidth: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	topContainer:{
		width:'100%',
		paddingTop:10,
		paddingHorizontal:20,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		// position:'absolute',
		// borderColor:white,
		// borderWidth: 1,
		height:'20%',
	},
	centerContainer:{
		width:'100%',
		flexDirection:'row',
		justifyContent:'space-evenly',
		alignItems:'center',
		height:'100%',
		// borderColor:white,
		// borderWidth: 1,
		position:'absolute',
	},
	playButton:{
		backgroundColor:gray_dark,
		padding:10,
		// paddingLeft:15,
		borderRadius:100,
		justifyContent:'center',
		alignItems:'center',
	},
	bottomContainer:{
		width:'100%',
		height:'20%',
		alignItems:'center',
		justifyContent:'center',
		flexDirection:'row',
		// borderColor:white,
		// borderWidth: 1,
		paddingHorizontal:50,
		bottom:0,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		marginBottom: 10,
	},
	subtitleButton: {
		padding: 10,
		marginVertical: 5,
		backgroundColor: dark_purple2,
		borderRadius: 5,
	},
	subtitleText: {
		fontSize: 14,
	},
})
export const configPlayerStyle = StyleSheet.create({
	container:{
		width:'100%',
		height:'100%',
		borderWidth:1,
		borderColor:white,
		position:'absolute',
		alignItems:'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	innerContainer:{
		// display:'flex',
		width:'50%',
		borderRadius:10,
		backgroundColor:gray_dark,
		padding:20,
		// justifyContent:"center",
		// paddingHorizontal:100,
	},
	innerContainerContainer:{
		display:"flex",
		justifyContent:"space-between",
		flexDirection:'column',
	}
})
