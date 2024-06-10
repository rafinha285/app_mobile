import React from "react";
import { View } from "react-native";
import { homeStyle } from "../styles/homeStyle";
import Header from "../components/Header.tsx";
import TextFont from "../components/TextFont.tsx";

const AnimeLancamentos:React.FC=()=>{
    return(
        <View style={homeStyle.body}>
            <Header/>
            <TextFont>Anime</TextFont>
        </View>
    )
}
export default AnimeLancamentos
