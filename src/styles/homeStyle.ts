import { StyleSheet } from "react-native";
import { body_purple, white } from "./baseStyle";

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
    },
    innerContainer:{
        height:500,
    },
    title:{
        fontSize:16,
    }
})
