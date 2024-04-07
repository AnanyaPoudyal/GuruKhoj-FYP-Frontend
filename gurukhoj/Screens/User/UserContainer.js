import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UserScreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching user ID from AsyncStorage...');
        const userId = await AsyncStorage.getItem('UserId');
        console.log('Retrieved user ID:', userId);

        if (userId) {
          console.log('Fetching user data from backend...');
          const token = await AsyncStorage.getItem('AccessToken');
          const response = await axios.get(`${baseURL}gkusers/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          console.log('User data response:', response.data);
          setUserData(response.data.data);
        } else {
          console.log('User ID not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('User data:', userData);
  }, [userData]);

  const navigation = useNavigation();
  const handleLogout = async () => {
    // Clear authentication token from AsyncStorage
    await AsyncStorage.removeItem('AccessToken');
    // Navigate user to the login screen
    navigation.navigate("Login");
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile:</Text>
      {userData && (
        <View style={styles.userContainer}>
          <Text style={styles.userInfo}>First Name: {userData.first_name}</Text>
          <Text style={styles.userInfo}>Last Name: {userData.last_name}</Text>
          <Text style={styles.userInfo}>Address: {userData.address}</Text>
          <Text style={styles.userInfo}>Email: {userData.email}</Text>
          {/* Render other user fields as needed */}
        </View>
      )}

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#4DBFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    height: '40%',
    width: '90%',
    borderWidth: 3  ,
    borderColor: '#4DBFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  userInfo: {
    alignItems: 'center',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default UserScreen;


