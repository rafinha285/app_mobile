import React from "react";
import { View } from "react-native";
import { homeStyle } from "../styles/homeStyle.ts";
import Header from "../components/Header.tsx";
import TextFont from "../components/TextFont.tsx";

const MangaLancamentos:React.FC=()=>{
    return(
        <View style={homeStyle.body}>
            <Header/>
            <TextFont>Manga</TextFont>
        </View>
    )
}
export default MangaLancamentos
