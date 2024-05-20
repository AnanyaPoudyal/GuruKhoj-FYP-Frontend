import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseUrl'; // Assuming you have a baseURL file for API endpoint

const TutorHome = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [userId, setUserId] = useState(null); // State to store the user ID

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get the token from AsyncStorage
                const token = await AsyncStorage.getItem('AccessToken');
                if (!token) {
                    throw new Error('Access token not found');
                }

                // Get the user ID from AsyncStorage
                const storedUserId = await AsyncStorage.getItem('UserId');
                if (!storedUserId) {
                    throw new Error('User ID not found in AsyncStorage');
                }
                console.log('Stored UserId:', storedUserId); // Log the stored user ID
                setUserId(storedUserId); // Set the user ID state

                // Fetch enrollments data where the program's user ID matches the stored user ID
                const response = await axios.get(`${baseURL}gkfeedbacks`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Filter enrollments where the program's user ID matches the stored user ID
                const filteredFeedbacks = response.data.filter(item => item.gkuser === storedUserId);


                console.log('Fetched Feedbacks:', filteredFeedbacks); // Log the fetched feedbacks
                setFeedbacks(filteredFeedbacks);
            } catch (error) {
                console.error('Error fetching feedbacks:', error.message);
                Alert.alert('Error', 'Failed to fetch feedbacks. Please try again.');
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Feedbacks</Text>
            <FlatList
                data={feedbacks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.enrollment}>
                        <Text style={styles.userInfo}>Feedback: {item.feedback ? `${item.feedback}` : 'Not available'}</Text>
                        <Text style={styles.userInfo}>Stars: {item.stars}</Text>

                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0', // Light gray background color
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4DBFFF', // Blue header color
    },
    enrollment: {
        borderWidth: 2,
        borderColor: '#4DBFFF', // Blue border color
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#ffffff', // White background color
    },
    userInfo: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333333', // Dark text color
    },
});

export default TutorHome;
