import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button, Alert } from 'react-native';
import { Container, H1, Right, Left } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

const SingleProgram = (props) => {
    const [item, setItem] = useState(props.route.params.item);
    const [enrolled, setEnrolled] = useState(false);
    const [userName, setUserName] = useState('');

    console.log(item);

    useEffect(() => {
        // Fetch user name when component mounts
        fetchUserName();
    }, []);

    // Function to fetch user name
    const fetchUserName = async () => {
        try {
            // Make API call to fetch user details based on gkuser ID
            const token = await AsyncStorage.getItem('AccessToken');
            const response = await axios.get(`${baseURL}gkusers/${item.gkuser}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });
            // Assuming user's first name and last name are stored in the response
            setUserName(`${response.data.data.first_name} ${response.data.data.last_name}`);
        } catch (error) {
            console.error('Error fetching user name:', error);
        }
    };

    // Function to handle enrollment
    const handleEnroll = async () => {
        try {
            // Retrieve user ID from AsyncStorage
            const userId = await AsyncStorage.getItem('UserId');
            const token = await AsyncStorage.getItem('AccessToken');
            // Make API call to enroll in the program
            const response = await axios.post(`${baseURL}gkadmits/`, {
                gkstatus: 'waiting',
                gkuser: userId,
                gkprogram: item._id,
            }, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });
            setEnrolled(true);
            // Handle successful enrollment
            Alert.alert('Enrollment Successful', 'You have successfully enrolled in the program.');
        } catch (error) {
            // Handle error
            console.error('Error enrolling in program:', error);
            Alert.alert('Enrollment Failed', 'Failed to enroll in the program. Please try again later.');
        }
    };

    return ( 
        <Container style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image
                        source={{ uri: "https://m.media-amazon.com/images/I/8179uEK+gcL._AC_UF1000,1000_QL80_.jpg" }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <H1 style={styles.contentHeader}>
                        {item.gkprogramArea}
                    </H1>
                    <Text style={styles.contentText}>
                        {item.gkprogramSubject}
                    </Text>
                    <Text style={styles.contentText}>
                        {item.gkprogramAddress}
                    </Text>
                    <Text style={styles.contentText}>
                        {item.gkprogramStartTime}
                    </Text>
                    <Text style={styles.contentText}>
                        {item.gkprogramEndTime}
                    </Text>
                    <Text style={styles.contentText}>
                        {userName && `Tutor: ${userName}`} 
                    </Text>
                </View>
           
            </ScrollView>

            <View style={styles.bottomContainer}>
                    <Left>
                        <Text style={styles.price}>$ {item.gkprogramPrice}
                        </Text>
                    </Left>
                    <Right>
                    {enrolled ? ( // If enrolled, display text
                        <Text>Enrolled</Text>
                    ) : ( // If not enrolled, display button
                        <Button title="Enroll" onPress={handleEnroll} /> 
                    )}
                </Right>

                </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '95%',
        width: '90%',
        borderWidth: 5,
        borderColor: '#4DBFFF',
        borderRadius: 50,
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 20,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        width: '85%',
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red'
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})

export default SingleProgram;
