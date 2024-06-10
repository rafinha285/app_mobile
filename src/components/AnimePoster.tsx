import React from "react";
import { anime } from "../types/anime";
import { View } from "react-native";
import { animeComponentStyle } from "../styles/animeComponentStyle";
import FastImage from 'react-native-fast-image';
import { PressableView } from "./ViewTochable";
import { useNavigation } from "@react-navigation/native";
import { ipApi } from "../consts.ts";
// import { RootStackParamList } from "../types/screenType";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface props{
    animee:anime
}
// type AnimeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Anime'>;
const AnimePoster:React.FC<props>=({animee})=>{
    // console.log(animee);
    // const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const imageUrl = `${ipApi}/ani/img?Id=${animee.id}`
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('Anime' as never, { animeId:animee.id } as never);
    };
    return(
        <PressableView onPress={onPress}>
            <View style={animeComponentStyle.main}>
                <FastImage
                style={animeComponentStyle.img}
                source={{
                    uri:imageUrl,
                    priority:FastImage.priority.high
                }}
                ></FastImage>
            </View>
        </PressableView>
    )
}
export default AnimePoster
