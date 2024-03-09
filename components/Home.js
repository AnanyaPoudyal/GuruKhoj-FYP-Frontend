import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the Home screen!</Text>
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default Home;
