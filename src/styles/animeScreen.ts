import { StyleSheet } from "react-native"
import { gray, gray_dark, light_gray, orange, purple, white } from "./baseStyle.ts";
// import { white } from "./baseStyle"

export const animeStyle = StyleSheet.create({
	topView:{
		display:"flex",
		// justifyContent:"center",
		padding:20,
		paddingVertical:30,
		width:'100%',
		height:undefined,
	},
	titleDiv:{
		display: "flex",
		flexDirection:"column",
		flexShrink:1,
		marginRight:5
	},
	title:{
		fontSize:25,
		color:white,
		textAlign:"center",
		// width:'auto',
	},
	name2:{
		color:light_gray,
		marginHorizontal:"auto"
	},
	img:{
		// minHeight:500,
		width:201,
		height:295,
		// aspectRatio:9 / 16,
		marginHorizontal:"auto",
		// marginBottom:30,
		borderRadius:11,
	},
	imgShadow:{
		shadowColor:"#000",
		shadowOffset:{width:7, height:9 },
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 50,
	},
	topText:{
		width:"100%",
		display:"flex",
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between",
		paddingHorizontal:30,
		marginVertical:20,
		// borderWidth:1,
		// borderColor:white,
	},
	descDiv:{
		// width:"100%",
		// display:"flex",
		borderWidth:1,
		borderColor:white,
		borderRadius:10,
		paddingHorizontal:10,
		justifyContent:"center",
		marginBottom:20
	},
	descText:{
		fontSize:16,
		color:white,
		textAlign:"center",
		fontWeight:"400",
	},
	details:{
		// borderWidth:1,
		// borderColor:white,
		marginBottom:20
	},
	detailsText:{
		fontSize:16,
		fontWeight:'100',
		marginVertical:5
	},
	genDiv:{
		// borderColor:white,
		// borderWidth:1,
		padding:5,
		borderRadius:5,
		width:"100%"
	},
	seasonSelectDiv:{
		backgroundColor:gray_dark,
		width:'100%',
		// height:50,
		padding:10,
		borderRadius:6,
		marginBottom:10,
	},
	seasonSelect:{
		width: '100%',
		borderColor:white,
		borderWidth:2,
		borderRadius:8,
	}
})
export const addAnimeListButtonStyle = StyleSheet.create({
	container:{
		borderWidth:1,
		borderColor:white,
		borderRadius:8,
		paddingHorizontal:10,
		paddingVertical:5,
		width:"46%",
		flexDirection:"row",
		alignItems:'center',
		marginHorizontal:"auto"
	}
})
export const animeEpisodeComponentStyle = StyleSheet.create({
	container:{
		borderWidth:1,
		borderColor:gray,
		borderRadius:5,
		paddingVertical:5,
		display:"flex",
		// justifyContent:"space-between",
		flexDirection:"column",
		flexWrap:"wrap",
		marginVertical:5
	},
	textDiv:{
		width:"100%",
		padding:5
	},
	text:{
		fontSize:16,
		// textB
	},
	button:{
		backgroundColor:purple,
		// width:"20%",
		flexDirection:"row",
		padding:10,
		paddingHorizontal:20,
		borderRadius:6,
	}
})
