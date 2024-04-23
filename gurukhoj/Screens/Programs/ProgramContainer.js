import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ProgramList from './programList'; // Importing the ProgramList component
import baseURL from '../../assets/common/baseUrl'; // Importing the base URL for API requests
import axios from 'axios'; // Importing Axios for making HTTP requests
import { useFocusEffect } from '@react-navigation/native'; // Importing useFocusEffect from React Navigation

const ProgramContainer = (props) => {
    // State to store the list of programs and the selected program area
    const [programs, setPrograms] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);

    // Function to fetch programs from the API
    const fetchPrograms = async () => {
        try {
            const response = await axios.get(`${baseURL}gkprograms`);
            setPrograms(response.data);
        } catch (error) {
            console.error('Error fetching programs:', error);
        }
    };

    // useEffect hook to fetch programs when the component mounts
    useEffect(() => {
        fetchPrograms();
    }, []);

    // Function to handle selection of program area
    const handleAreaSelection = (area) => {
        setSelectedArea(area);
    };

    // Function to filter programs by selected area
    const filteredPrograms = selectedArea
        ? programs.filter((program) => program.gkprogramArea === selectedArea)
        : programs;

    return (
        <View>
            <View style={{ marginTop: 10 }}>
                {/* Horizontal FlatList to render the list of program areas */}
                <FlatList
                    horizontal
                    data={programs}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={
                                selectedArea === item.gkprogramArea
                                    ? styles.selectedArea
                                    : styles.area
                            }
                            onPress={() => handleAreaSelection(item.gkprogramArea)}
                        >
                            <Text style={styles.areaText}>{item.gkprogramArea}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.gkprogramArea}
                />
            </View>
            {/* Render the ProgramList component with filtered programs */}
            <FlatList
                numColumns={2} // Display two columns
                data={filteredPrograms} // Data source
                renderItem={({ item }) => (
                    <ProgramList key={item.id} item={item} navigation={props.navigation} />
                )} // Render each program item using the ProgramList component
                keyExtractor={(item) => item.id} // Key extractor function to extract unique keys for each item
            />
        </View>
    );
};

const styles = StyleSheet.create({
    area: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: 'white', 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectedArea: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#FF6F61', 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    areaText: {
        fontWeight: 'bold',
        color: '#333', 
    },
});

export default ProgramContainer;
