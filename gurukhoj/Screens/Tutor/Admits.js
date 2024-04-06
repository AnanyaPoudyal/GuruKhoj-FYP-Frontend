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
                    <Text>User: {`${item.gkuser.first_name} ${item.gkuser.last_name}`}</Text>
                    {item.gkprogram ? (
                        <Text>Program: {item.gkprogram.gkprogramArea}</Text>
                    ) : (
                        <Text>Program: Not available</Text>
                    )}
                    <Text>Status: {item.gkstatus}</Text>
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
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    enrollment: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
});

export default AdmitsScreen;
