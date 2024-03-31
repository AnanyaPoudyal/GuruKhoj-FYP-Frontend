import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { LogBox } from 'react-native';



//Navigators
import Main from './Navigators/Main';

// Screens
import Header from './Screens/Shared/Header';
import ProgramContainer from './Screens/Programs/ProgramContainer';
export default function App() {
  return (
   <NavigationContainer>
     
      <Header/>
      <Main />
   </NavigationContainer>
  );
}
