import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import axios from 'axios';
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = ({ navigation, route }) => {
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
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

    const fetchUserFeedbacks = async () => {
      try {
        const token = await AsyncStorage.getItem('AccessToken');
        const response = await axios.get(`${baseURL}gkfeedbacks/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch user feedbacks');
        }

        const data = response.data.data;
        setFeedbacks(data);
      } catch (error) {
        console.error('Error fetching user feedbacks:', error);
        setError(error.message);
      }
    };

    fetchUserProfile();
    fetchUserFeedbacks();
  }, [userId]);

  const handleFeedbackPress = () => {
    navigation.navigate('Feedback', { userId });
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
            <Text style={styles.buttonText}>Rate and Review</Text>
          </TouchableOpacity>

          <Text style={styles.subTitle}>Feedbacks</Text>
          <FlatList
            data={feedbacks}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.feedbackContainer}>
                <Text style={styles.feedbackText}>{item.feedback}</Text>
                <Text style={styles.feedbackStars}>Stars: {item.stars}</Text>
              </View>
            )}
          />
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
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
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
  feedbackContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  feedbackText: {
    fontSize: 16,
    color: '#333',
  },
  feedbackStars: {
    fontSize: 14,
    color: '#4DBFFF',
    marginTop: 5,
  },
});

export default UserProfile;


