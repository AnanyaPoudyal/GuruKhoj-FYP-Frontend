import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text>Welcome to the Home screen!</Text>
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20,
  },
  logo: {
    width: 216, 
    height: 69, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
})

export default Home;
