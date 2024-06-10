import React from "react";
import { ScrollView} from "react-native";
import Header from "../components/Header";
import { homeStyle } from "../styles/homeStyle";
import Animes from "../components/Animes";
import { white } from "../styles/baseStyle.ts";
import RecentEpisodes from "../components/RecentEpisodes.tsx";


const Home:React.FC=()=>{
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
