import React from "react";
import { Button, StyleSheet, Text, TouchableOpacityComponent, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
// import LinearGradient from "react-native-linear-gradient";
// import { NavigationContainer } from "@react-navigation/native";
// import 'react-native-gesture-handler';
import Home from "../screens/Home";
import { Link, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HeaderStyles } from "../styles/baseStyle";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser"

// const Stack = createStackNavigator();
const Header:React.FC = () =>{
    // const navigation = useNavigation();
    const handleNavigateToHome = () => {
        console.log("home hahahaha")
        // navigation.navigate("Home"); // Navega para a tela "Home"
    };
    return(
        // <LinearGradient colors={['#1d1160', 'rgba(0,0,0,0)']} style={styles.gradient}>
            <View style={HeaderStyles.header}>
                <Text style={HeaderStyles.title}>Animefoda</Text>
                <View style={HeaderStyles.userDiv}>
                    {/* <Text>AA</Text> */}
                    <FontAwesomeIcon icon={faUser} style={HeaderStyles.userIcon}/>
                </View>
            </View>
        // </LinearGradient>
    )
}

export default Header