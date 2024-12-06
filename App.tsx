import React, { useEffect } from "react";
import Home from './src/screens/Home';
import AnimeComponent from './src/screens/AnimeComponent.tsx';
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import AnimeLancamentos from './src/screens/AnimeLancamentos';
import MangaLancamentos from './src/screens/MangaLancamentos';
import { setCustomText } from 'react-native-global-props';
import { theme } from "./src/styles/baseStyle.ts";
import GlobalProvider from "./src/GlobalProvider.tsx";
import Login from "./src/screens/Login.tsx";
import Register from "./src/screens/Register.tsx";
import User from "./src/screens/User.tsx";
import Watch from "./src/screens/Watch.tsx";
// import { createStackNavigator } from "@react-navigation/stack";


// import { homeStyle } from './src/styles/homeStyle';

const Stack = createNativeStackNavigator();

function App() {
  // useEffect(()=>{
  //   useNavigation().navigate("Home" as never);
  // },[])
    useEffect(() => {
        setCustomText(theme);
    }, []);
    return (
        <NavigationContainer>
            <GlobalProvider>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            headerShown: false,
                            orientation:"portrait"
                    }}/>
                    <Stack.Screen
                        name="Anime"
                        component={AnimeComponent}
                        options={{
                            headerShown: false,
                            orientation:"portrait"
                    }}/>
                    <Stack.Screen
                        name="AnimeLancamentos"
                        component={AnimeLancamentos}
                        options={{
                            headerShown: false,
                            orientation:"portrait"
                    }}/>
                    <Stack.Screen
                        name="MangaLancamentos"
                        component={MangaLancamentos}
                        options={{
                            headerShown: false,
                            orientation:"portrait"
                    }}/>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            headerShown: false,
                            orientation:"portrait"
                    }}/>
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{
                            headerShown: false,
                            orientation:"portrait"
                    }} />
                    <Stack.Screen
                        name="User"
                        component={User}
                        options={{
                            headerShown: false,
                            orientation:"portrait"
                    }}/>
                    <Stack.Screen
                        name="Watch"
                        component={Watch}
                        options={{
                            orientation:"landscape",
                            headerShown: false,
                    }}/>
                </Stack.Navigator>
            </GlobalProvider>
        </NavigationContainer>
  );
}

export default App;
