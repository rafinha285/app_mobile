import React, { useEffect, useState } from "react";
import LinearGradient from 'react-native-linear-gradient';
import { body_purple } from "../../styles/baseStyle.ts";
import { homeStyle } from "../../styles/homeStyle.ts";
import { Button, ScrollView, Text, View } from "react-native";
import { animesStyle } from "../../styles/animeComponentStyle.ts";
import { PressableView } from "../ViewTochable.tsx";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Anime } from "../../types/anime";
import AnimePoster from "./anime/AnimePoster.tsx";
import TextFont from "../TextFont.tsx";
import { ipApi, ipBase } from "../../consts.ts";
// import { RootStackParamList } from "../types/screenType";


interface props{
    manga:boolean
}
// type AnimeRouteProp = RouteProp<RootStackParamList, 'Anime'>;
const Animes:React.FC<props>=({manga})=>{
    const navigation = useNavigation();
    // const route = useRoute<AnimeRouteProp>();
    
    const [aniPosters,setAniPosters] = useState<React.JSX.Element[]>();
    const [mangaPosters,setMangaPosters] = useState<React.JSX.Element[]>();
    useEffect(()=>{
        fetch(`${ipBase}/ani/g/lan`).then(res=> {
            console.log(res.status);
            return res.json();
        })
        .then((data:Anime[])=>{
            const posterList = data.map((anime,index:number)=>(
                <AnimePoster
                    animee={anime}
                    key={index}
                />
            ));
            setAniPosters(posterList);
        }).catch(err=>console.error(err));
    },[]);
    const handleAnimePress = () => {
        navigation.navigate('AnimeLancamentos' as never);
    };
    const handleMangaPress=()=>{
        navigation.navigate("MangaLancamentos"as never)
    }
    return <LinearGradient style={animesStyle.anime}
                    colors={[body_purple, '#1c1156', body_purple,]}
                    locations={[0, 0.2, 1]}
        >
        <View style={animesStyle.animeTitleDiv}>
            <TextFont style={animesStyle.animeTitle}>{!manga ? "Anime" : "Manga"}</TextFont>
            <PressableView onPress={!manga ? handleAnimePress : handleMangaPress}>
                <TextFont>Lançamentos</TextFont>
            </PressableView>
        </View>
        <View style={animesStyle.animeComponentList}>
            <ScrollView
                horizontal={true}>
                {!manga ? aniPosters : mangaPosters}
            </ScrollView>
            {/* <Text>a</Text> */}
        </View>
    </LinearGradient>;
};
export default Animes;
