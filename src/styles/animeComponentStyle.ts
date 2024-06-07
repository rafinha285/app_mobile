import { StyleSheet } from "react-native"
import { blue, white } from "./baseStyle"


export const animesStyle = StyleSheet.create({
    anime:{
        width:"100%",
        height:233,
        backgroundColor:white,
        paddingVertical:35,
        paddingHorizontal:15,
        marginTop:10
    },
    animeTitleDiv:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    animeTitle:{
        fontSize:20
    },
    animeButton:{
        backgroundColor:blue
    }
})
export const animeComponentStyle = StyleSheet.create({

})