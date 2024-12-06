import React from "react";
// import { View } from "react-native";
import { body_purple, FooterStyles } from "../../styles/baseStyle.ts";
import LinearGradient from "react-native-linear-gradient";
import { View } from "react-native";

const Footer:React.FC=()=>{
    return(
        <LinearGradient
            colors={[body_purple,"#4D05B3"]}
            locations={[0,1]}
            style={FooterStyles.main}>
                <View>
                
                </View>
        </LinearGradient>
    )
}
export default Footer
