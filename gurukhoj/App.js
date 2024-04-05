import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Screens/Shared/Header';

// Navigators
import Main from './Navigators/Main';
import AuthStack from './Navigators/AuthStack'; // Stack navigator for authentication screens

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      // If token exists, user is logged in
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  return (
    <NavigationContainer>
      <Header />
      {isLoggedIn ? <Main /> : <AuthStack />}
    </NavigationContainer>
  );
}
