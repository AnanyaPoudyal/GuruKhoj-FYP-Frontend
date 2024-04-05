import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import Login from "../Screens/User/login";
import StudentRegister from "../Screens/User/studentRegister";
import TutorRegister from "../Screens/User/tutorRegister";
import ProgramContainer from "../Screens/Programs/ProgramContainer";
import Main from './Main';
import UserNavigator from './UserNavigator';
import TutorMain from './TutorMain';

const Stack = createStackNavigator();

const AuthStack = () => {
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
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="StudentRegister" component={StudentRegister} />
          <Stack.Screen name="TutorRegister" component={TutorRegister} />
          <Stack.Screen name="Home" component={TutorMain} />
          
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
