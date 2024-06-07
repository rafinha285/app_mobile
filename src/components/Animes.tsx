import React from "react";
import LinearGradient from 'react-native-linear-gradient';
import { body_purple } from "../styles/baseStyle";
import { homeStyle } from "../styles/homeStyle";
import { Button, Text, View } from "react-native";
import { animesStyle } from "../styles/animeComponentStyle";
import { PressableView } from "./ViewTochable";
import { useNavigation } from '@react-navigation/native';


interface props{
    manga:boolean
}
const Animes:React.FC<props>=({manga})=>{
    const navigation = useNavigation();
    const handleAnimePress = () => {
        navigation.navigate('AnimeLançamentos' as never);
    };
    const handleMangaPress=()=>{
        navigation.navigate("MangaLançamentos"as never)
    }
    if(!manga){
        return<LinearGradient style={animesStyle.anime}
            colors={[body_purple, '#1c1156', body_purple,]}
            locations={[0, 0.2, 1]}
        >
            <View style={animesStyle.animeTitleDiv}>
            <Text style={animesStyle.animeTitle}>Manga</Text>
            <View>
                <PressableView onPress={handleAnimePress}>
                    <Text>Lançamentos</Text>
                </PressableView>
            </View>
            </View>
        </LinearGradient>
    }
    return<LinearGradient style={animesStyle.anime}
            colors={[body_purple, '#1c1156', body_purple,]}
            locations={[0, 0.2, 1]}
        >
        <View style={animesStyle.animeTitleDiv}>
            <Text style={animesStyle.animeTitle}>Manga</Text>
            <View>
                <PressableView onPress={handleMangaPress}>
                    <Text>Lançamentos</Text>
                </PressableView>
            </View>
        </View>
    </LinearGradient>
    
}
export default Animes
