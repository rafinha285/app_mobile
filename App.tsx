import React from 'react';
import { SafeAreaView, View ,Text} from 'react-native';
import Home from './src/screens/Home';
import Anime from './src/screens/Anime';
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import AnimeLancamentos from './src/screens/AnimeLancamentos';
import MangaLancamentos from './src/screens/MangaLancamentos';


// import { homeStyle } from './src/styles/homeStyle';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  

  return <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="aaa"
          component={Home}
          options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen 
          name="Anime" 
          component={Anime}
          options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen
          name='AnimeLançamentos'
          component={AnimeLancamentos}
          options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen
          name='MangaLançamentos'
          component={MangaLancamentos}
          options={{headerShown:false}}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
}

export default App;
