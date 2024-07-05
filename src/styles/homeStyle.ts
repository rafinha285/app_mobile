import { StyleSheet } from "react-native";
import { body_purple, gray, white } from "./baseStyle";

export const homeStyle = StyleSheet.create({
    body:{
        backgroundColor:body_purple,
        margin:0,
        // flex:1
    },
})
export const recentEpisodesStyle = StyleSheet.create({
    container:{
        flexDirection:"column",
        padding:15,
        // borderColor:gray,
        // borderWidth:1
    },
    innerContainer:{
        display:"flex",
        // height:500,
        flex:1,
        // justifyContent:"space-between",
        alignItems:"flex-end",
        // flexWrap:"wrap",
        // rowGap:10,
        // columnGap:20,
        // marginHorizontal: "auto",
        // borderColor:gray,
        // borderWidth:1,
        padding:10,
    },
    title:{
        fontSize:16,
    }
})
export const recentEpisodeComponentStyle = StyleSheet.create({
    container:{
        borderWidth:2,
        borderColor:white,
        width:"98%",
        aspectRatio:16 / 9,
        borderRadius:10,
        marginVertical:10,
        overflow:"hidden",
        backgroundColor:"black",
        flexWrap:"wrap"
    },
    img:{
        width:'100%',
        height:'100%',
        opacity:.5
    },
    toptop:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
        width:'100%',
    },
    top:{
        position:"absolute",
        padding:20
    },
    topBottom:{
        bottom:0,
        
    },
    qualityLabel:{
        borderRadius:10,
        padding:5,
    }
})
