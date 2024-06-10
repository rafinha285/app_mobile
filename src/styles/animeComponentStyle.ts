import { StyleSheet } from "react-native"
import { blue, white } from "./baseStyle"


export const animesStyle = StyleSheet.create({
	anime:{
		width:"100%",
		height:300,
		backgroundColor:white,
		paddingVertical:35,
		paddingHorizontal:15,
		marginTop:10
	},
	animeTitleDiv:{
		display:"flex",
		flexDirection:"row",
		justifyContent:"space-between"
	},
	animeTitle:{
		fontSize:20
	},
	animeButton:{
		backgroundColor:blue
	},
	animeComponentList:{
		width:"100%",
		// borderColor:white,
		// borderWidth:1,
		display:"flex",
		height:"100%",
		alignContent:"center",
		padding:10
		// overflow:
	}
})
export const animeComponentStyle = StyleSheet.create({
	main:{
		// aspectRatio:9/16,
		width:124,
		height:181.96,
		borderColor:white,
		borderWidth:1,
		marginHorizontal:10,
		borderRadius:7,
		overflow:"hidden"
	},
	img:{
		width:"100%",
		height:"100%"
	}
})
