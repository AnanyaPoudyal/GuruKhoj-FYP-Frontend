import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ProgramList from './programList'; // Importing the ProgramList component
import baseURL from '../../assets/common/baseUrl'; // Importing the base URL for API requests
import axios from 'axios'; // Importing Axios for making HTTP requests

const ProgramContainer = (props) => {
    // State to store the list of programs and the selected program area
    const [programs, setPrograms] = useState([]);
    const [programAreas, setProgramAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);

    // Function to fetch programs from the API
    const fetchPrograms = async () => {
        try {
            const response = await axios.get(`${baseURL}gkprograms`);
            setPrograms(response.data);
            extractProgramAreas(response.data);
        } catch (error) {
            console.error('Error fetching programs:', error);
        }
    };

    // Function to extract unique program areas from the fetched programs
    const extractProgramAreas = (programs) => {
        const areas = new Set();
        programs.forEach(program => {
            areas.add(program.gkprogramArea);
        });
        setProgramAreas([...areas]);
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
                    data={programAreas}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={
                                selectedArea === item
                                    ? styles.selectedArea
                                    : styles.area
                            }
                            onPress={() => handleAreaSelection(item)}
                        >
                            <Text style={styles.areaText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                />
            </View>
            {/* Render the ProgramList component with filtered programs */}
            <FlatList
                numColumns={2} // Display two columns
                data={filteredPrograms} // Data source
                renderItem={({ item }) => (
                    <ProgramList key={item.id} item={item} navigation={props.navigation} />
                )} // Render each program item using the ProgramList component
                keyExtractor={(item) => item.id.toString()} // Key extractor function to extract unique keys for each item
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
