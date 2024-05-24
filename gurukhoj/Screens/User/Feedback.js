import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-stars';

const Feedback = ({ route }) => {
  const { userId } = route.params;
  const [feedback, setFeedback] = useState('');
  const [stars, setStars] = useState(3);

  const submitFeedback = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      console.log('Token:', token);

      const data = {
        gkuser: userId,
        feedback,
        stars,
      };
      console.log('Data sent to backend:', data);

      const response = await axios.post(`${baseURL}gkfeedbacks`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response:', response.data);
      // Handle success
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error
    }
  };

  return (
    <View style={styles.container}>
      <Text>Provide Feedback</Text>
      <TextInput
        style={styles.input}
        value={feedback}
        onChangeText={setFeedback}
        placeholder="Enter your comments"
      />
      {/* Use the StarRating component */}
      <StarRating
        disabled={false}
        maxStars={5}
        rating={stars}
        fullStarColor={'orange'}
        emptyStarColor={'gray'}
        halfStarEnabled={true}
        selectedStar={(rating) => {
          console.log('Selected star:', rating);
          setStars(rating);
        }}
      />
      <Button title="Submit Feedback" onPress={submitFeedback} />
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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    height: 40,
  },
});

export default Feedback;
