import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
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
      
          // Axios automatically parses JSON responses, so no need to call response.json()
          const data = response.data.data;
          setUserData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setError(error.message);
          setLoading(false);
        }
      };

    console.log('Fetching user profile for userId:', userId);
    fetchUserProfile();
  }, [userId]);

  const handleFeedbackPress = () => {
    // Navigate to the feedback screen with the tutor's user ID
    navigation.navigate('Feedback', { userId });
  };
  const handleReviewPress = () => {
    // Navigate to the feedback screen with the tutor's user ID
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
      {userData ? (
        <>
          <Text style={styles.title}>User Profile</Text>
          <Text style={styles.label}>First Name:</Text>
          <Text>{userData.first_name}</Text>
          <Text style={styles.label}>Last Name:</Text>
          <Text>{userData.last_name}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text>{userData.email}</Text>
          <Text style={styles.label}>Address:</Text>
          <Text>{userData.address}</Text>
          <Button title="Give Feedback" onPress={handleFeedbackPress} />
          <Button title="Rate and Review" onPress={handleReviewPress} />
        </>
      ) : (
        <Text>No user data found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default UserProfile;
