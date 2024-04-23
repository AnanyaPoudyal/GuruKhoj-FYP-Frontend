import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = ({ navigation, route }) => {
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
          const token = await AsyncStorage.getItem('AccessToken');
          const response = await axios.get(`${baseURL}gkusers/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      
          if (response.status !== 200) {
            throw new Error('Failed to fetch user data');
          }
      
          const data = response.data.data;
          setUserData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setError(error.message);
          setLoading(false);
        }
      };

    fetchUserProfile();
  }, [userId]);

  const handleFeedbackPress = () => {
    navigation.navigate('Feedback', { userId });
  };

  const handleReviewPress = () => {
    navigation.navigate('Review', { userId });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userData && (
        <>
          <Image
            source={{ uri: userData.photo || "https://m.media-amazon.com/images/I/8179uEK+gcL._AC_UF1000,1000_QL80_.jpg"}}
            style={styles.userPhoto}
            onError={(error) => console.error('Error loading image:', error)}
          />
          <Text style={styles.title}>User Profile</Text>
          <View style={styles.userInfoContainer}>
            <Text style={styles.label}>First Name:</Text>
            <Text style={styles.info}>{userData.first_name}</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.label}>Last Name:</Text>
            <Text style={styles.info}>{userData.last_name}</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.info}>{userData.email}</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.info}>{userData.address}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleFeedbackPress}>
            <Text style={styles.buttonText}>Give Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleReviewPress}>
            <Text style={styles.buttonText}>Rate and Review</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#4DBFFF',
  },
  info: {
    flex: 1,
    color: '#333',
  },
  userPhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4DBFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserProfile;
