import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseUrl'; // Assuming you have a baseURL file for API endpoint

const AdmitsScreen = () => {
    const [enrollments, setEnrollments] = useState([]);
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
                const response = await axios.get(`${baseURL}gkadmits/?userId=${storedUserId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Filter enrollments where the program's user ID matches the stored user ID
                const filteredEnrollments = response.data.filter(item => item.gkprogram && item.gkprogram.gkuser === storedUserId);


                console.log('Fetched Enrollments:', filteredEnrollments); // Log the fetched enrollments
                setEnrollments(filteredEnrollments);
            } catch (error) {
                console.error('Error fetching enrollments:', error.message);
                Alert.alert('Error', 'Failed to fetch enrollments. Please try again.');
            }
        };

        fetchData();
    }, []);

    // // Function to handle status edit
    // const handleEditStatus = async (id) => {
    //     try {
    //         // Get the token from AsyncStorage
    //         const token = await AsyncStorage.getItem('AccessToken');
    //         if (!token) {
    //             throw new Error('Access token not found');
    //         }

    //         // Make API call to update the status
    //         const response = await axios.put(`${baseURL}gkadmits/${id}`, {
    //             gkstatus: 'Enrolled',
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });

    //         // Update the enrollments state with the updated data
    //         setEnrollments(enrollments.map(item =>
    //             item.id === id ? { ...item, gkstatus: 'Enrolled' } : item
    //         ));

    //         // Display success message
    //         Alert.alert('Success', 'Status updated successfully');
    //     } catch (error) {
    //         console.error('Error editing status:', error.message);
    //         // Display error message
    //         Alert.alert('Error', 'Failed to update status. Please try again.');
    //     }
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enrollments</Text>
            <FlatList
                data={enrollments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.enrollment}>
                        <Text style={styles.userInfo}>User: {item.gkuser ? `${item.gkuser.first_name} ${item.gkuser.last_name}` : 'Not available'}</Text>
                        <Text style={styles.userInfo}>Program: {item.gkprogram ? item.gkprogram.gkprogramArea : 'Not available'}</Text>
                        <Text style={styles.userInfo}>Status: {item.gkstatus}</Text>

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

export default AdmitsScreen;
