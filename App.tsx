import React, { useEffect } from "react";
import Home from './src/screens/Home';
import Anime from './src/screens/Anime';
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import AnimeLancamentos from './src/screens/AnimeLancamentos';
import MangaLancamentos from './src/screens/MangaLancamentos';
import { setCustomText } from 'react-native-global-props';
import { theme } from "./src/styles/baseStyle.ts";
import GlobalProvider from "./src/GlobalProvider.tsx";
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
  return (<NavigationContainer>
          <GlobalProvider>
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen
                  name="Anime"
                  component={Anime}
                  options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen
                  name="AnimeLancamentos"
                  component={AnimeLancamentos}
                  options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen
                  name="MangaLancamentos"
                  component={MangaLancamentos}
                  options={{headerShown: false}}></Stack.Screen>
              </Stack.Navigator>
          </GlobalProvider>
    </NavigationContainer>
  );
}

export default App;
