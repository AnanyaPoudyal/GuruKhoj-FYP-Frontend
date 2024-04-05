import React from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserNavigator from '../../Navigators/UserNavigator';


const TutorHome = ({ navigation }) => {
  const handleLogout = async () => {
    // Clear authentication token from AsyncStorage
    await AsyncStorage.removeItem('AccessToken');
    // Navigate user to the login screen
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text>Tutor Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TutorHome;
