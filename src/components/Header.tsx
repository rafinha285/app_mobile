import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderStyles } from "../styles/baseStyle";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faUser,faChevronLeft} from "@fortawesome/free-solid-svg-icons/"
import { PressableView } from "./ViewTochable.tsx";
import TextFont from "./TextFont.tsx";

// const Stack = createStackNavigator();
const Header:React.FC = () =>{
    const navigation = useNavigation();
    const handleNavigateToHome = () => {
        // console.log("home hahahaha")
        navigation.navigate("Home"); // Navega para a tela "Home"
    };
    const handleGoBack = () =>{
        if(navigation.canGoBack()){
            navigation.goBack();
        }
    }
    return(
        // <LinearGradient colors={['#1d1160', 'rgba(0,0,0,0)']} style={styles.gradient}>
            
            <View style={HeaderStyles.header}>
                {navigation.canGoBack()? (<PressableView onPress={handleGoBack}>
                    <FontAwesomeIcon icon={faChevronLeft} color="white" />
                </PressableView>):(<></>)}
                <PressableView onPress={handleNavigateToHome}>
                    <TextFont style={HeaderStyles.title}>Animefoda</TextFont>
                </PressableView>
                <View style={HeaderStyles.userDiv}>
                    {/* <TextFont>AA</TextFont> */}
                    <FontAwesomeIcon icon={faUser} style={HeaderStyles.userIcon}/>
                </View>
            </View>
        // </LinearGradient>
    )
}

export default Header
