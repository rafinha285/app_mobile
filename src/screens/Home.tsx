import React, { useEffect } from "react";
import { ScrollView} from "react-native";
import Header from "../components/homePage/Header.tsx";
import { homeStyle } from "../styles/homeStyle";
import Animes from "../components/homePage/Animes.tsx";
// import { white } from "../styles/baseStyle.ts";
import RecentEpisodes from "../components/homePage/RecentEpisodes.tsx";
import Orientation from "react-native-orientation-locker";
import parser from '../functions/VTTfunction.ts'
// import { parseTimestamp } from "../functions/captionsFuncitons.ts";
// import { createClass } from "../functions/captionsFuncitons.ts";


const Home = ()=>{
    Orientation.lockToPortrait();
    // console.log("Homee")
    useEffect(() => {
        // console.log("Home")
        // createClass()
        Orientation.lockToPortrait();
    }, []);
    return(
        <ScrollView style={[homeStyle.body]}>
            <Header></Header>
            <Animes manga={false}></Animes>
            <Animes manga={true}></Animes>
            <RecentEpisodes/>
        </ScrollView>
    )
}
export default Home
