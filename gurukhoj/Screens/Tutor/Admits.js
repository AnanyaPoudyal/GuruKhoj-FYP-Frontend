import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl'; // Assuming you have a baseURL file for API endpoint
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdmitsScreen = () => {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        // Function to fetch enrollments data
        const fetchEnrollments = async () => {
            try {
                // Get the token from AsyncStorage
                const token = await AsyncStorage.getItem('AccessToken');
                if (!token) {
                    console.error('Access token not found');
                    return;
                }

                // Make API call to fetch enrollments data
                const response = await axios.get(`${baseURL}gkadmits/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEnrollments(response.data);
            } catch (error) {
                console.error('Error fetching enrollments:', error);
            }
        };

        // Fetch enrollments data when the component mounts
        fetchEnrollments();
    }, []);

    // Function to handle status edit
    const handleEditStatus = async (id) => {
        try {
            // Get the token from AsyncStorage
            const token = await AsyncStorage.getItem('AccessToken');
            if (!token) {
                console.error('Access token not found');
                return;
            }
    
            // Make API call to update the status
            const response = await axios.put(`${baseURL}gkadmits/${id}`, {
                gkstatus: 'Enrolled', 
                gkuser: item.gkuser,
                gkprogram: item.gkprogram,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            // Update the enrollments state with the updated data
            setEnrollments(enrollments.map(item => 
                item.id === id ? { ...item, gkstatus: 'Enrolled' } : item
            ));
    
            // Display success message
            Alert.alert('Success', 'Status updated successfully');
        } catch (error) {
            console.error('Error editing status:', error);
            // Display error message
            Alert.alert('Error', 'Failed to update status. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enrollments</Text>
            <FlatList
                data={enrollments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.enrollment}>
                        <Text style={styles.userInfo}>User: {`${item.gkuser.first_name} ${item.gkuser.last_name}`}</Text>
                        <Text style={styles.userInfo}>Program: {item.gkprogram ? item.gkprogram.gkprogramArea : 'Not available'}</Text>
                        <Text style={styles.userInfo}>Status: {item.gkstatus}</Text>
                        <Button title="Edit Status" onPress={() => handleEditStatus(item.id)} />
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
