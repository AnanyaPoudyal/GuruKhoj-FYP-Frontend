import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UserScreen = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

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

  const handleEdit = () => {
    setEditing(true);
    setEditedData(userData);
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      await axios.put(`${baseURL}gkusers/${editedData.id}`, editedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditing(false);
      setUserData(editedData);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile:</Text>
      {userData && (
        <View style={styles.userContainer}>
          <Image
            source={{ uri: userData.photo || "https://m.media-amazon.com/images/I/8179uEK+gcL._AC_UF1000,1000_QL80_.jpg"}}
            style={styles.userPhoto}
            onError={(error) => console.error('Error loading image:', error)}
          />
          {!editing ? (
            <View>
              <Text style={styles.userInfo}>First Name: {userData.first_name}</Text>
              <Text style={styles.userInfo}>Last Name: {userData.last_name}</Text>
              <Text style={styles.userInfo}>Address: {userData.address}</Text>
              <Text style={styles.userInfo}>Email: {userData.email}</Text>
            </View>
          ) : (
            <View>
              <TextInput
                style={styles.input}
                value={editedData.first_name}
                onChangeText={(text) => setEditedData({...editedData, first_name: text})}
                placeholder="First Name"
              />
              <TextInput
                style={styles.input}
                value={editedData.last_name}
                onChangeText={(text) => setEditedData({...editedData, last_name: text})}
                placeholder="Last Name"
              />
              <TextInput
                style={styles.input}
                value={editedData.address}
                onChangeText={(text) => setEditedData({...editedData, address: text})}
                placeholder="Address"
              />
              <TextInput
                style={styles.input}
                value={editedData.email}
                onChangeText={(text) => setEditedData({...editedData, email: text})}
                placeholder="Email"
              />
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={!editing ? handleEdit : handleSave}>
            <Text style={styles.buttonText}>{!editing ? 'Edit' : 'Save'}</Text>
          </TouchableOpacity>
        </View>
      )}

      <Button  title="Logout" onPress={handleLogout}  />
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
    height: '60%',
    width: '90%',
    borderWidth: 3,
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
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4DBFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoutButton: {
    backgroundColor: '#FF6347', // Custom color
    marginTop: 20, // Add some margin to separate it from other elements
    paddingHorizontal: 20, // Adjust padding
    paddingVertical: 10, // Adjust padding
    borderRadius: 8, // Add rounded corners
  }
});

export default UserScreen;