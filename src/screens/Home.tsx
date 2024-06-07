import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { homeStyle } from "../styles/homeStyle";
import Animes from "../components/Animes";


const Home:React.FC=()=>{
    return(
        <View style={homeStyle.body}>
            <Header></Header>
            <Animes manga={false}></Animes>
            <Animes manga={true}></Animes>
        </View>
    )
}
export default Home