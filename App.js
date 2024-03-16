import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Home from './components/Home';
//iimport Register from './components/Register';
import FormScreen from './form/fromScreen';
import SearchScreen from './screens/search';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name='FromScreen' component={FormScreen} />
      <Stack.Screen name='Login' component={Login} />
      {/* <Stack.Screen name='Register' component={Register} /> */}
      <Stack.Screen name='Home' component={Home} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
