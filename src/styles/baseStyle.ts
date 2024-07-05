import { StyleSheet } from 'react-native';
// import { Colors } from "react-native/Libraries/NewAppScreen";

export var body_purple = '#1d0029';
export var header_purple = '#1D1160';
export var blue = '#0a0844';
export var lightpink = '#D93B92';
export var pink = '#AB05F2';
export var purple = '#6805F2';
export var orange = '#f26444';
export var dark_purple = '#21024d';
export var dark_purple2 = '#0c0011';
export var dark_purple3 = '#14022e';
export var dark_purple4 = '#1b0027';
export var border_purple = '#43005f';
export var light_blue = '#3c3a83';
export var light_blue2 = '#302e68';
export var light_gray = '#9da8b1';
export var yellow = '#ffc107';
export var green = '#28a745';
export var teal = '#20c997';
export var cyan = '#17a2b8';
export var white = '#fff';
export var gray = '#6c757d';
export var gray_dark = '#343a40';
export var primary = '#007bff';
export var secondary = '#6c757d';
export var success = '#28a745';
export var info = '#17a2b8';
export var warning = '#ffc107';
export var danger = '#dc3545';
export var red = '#dc3545';
export var indigo = '#6610f2';
export var light = '#f8f9fa';
export var dark = '#343a40';

export const HeaderStyles = StyleSheet.create({
    title:{
        fontSize:20,
        marginVertical:'auto',
        marginHorizontal:0,
    },
    header:{
        height: 60,
        width: '100%',
        paddingHorizontal: 30,
        backgroundColor: header_purple,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Centraliza verticalmente dentro do contêiner pai
    },
    nav:{
        display:'flex',
        // alignContent:"center",
        // alignItems:"center",
        justifyContent:'space-between',
    },
    userDiv:{
        padding:5,
    },
    userIcon:{
        color:white,
    },
});
export const FooterStyles = StyleSheet.create({
    main:{},
});
export const theme = {
    style: {
        fontFamily: 'Roboto-Medium',
        color: '#ffffff',
    },
};
export const baseStyles = StyleSheet.create({
    font:{
        fontFamily: 'Roboto-Medium',
        color:white,
    }
})
