import React, { useState, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import ProgramList from './programList'; // Importing the ProgramList component
import baseURL from '../../assets/common/baseUrl'; // Importing the base URL for API requests
import axios from 'axios'; // Importing Axios for making HTTP requests
import { useFocusEffect } from '@react-navigation/native'; // Importing useFocusEffect from React Navigation

const data = require('../../assets/data/program.json'); // Importing program data from a JSON file

const ProgramContainer = (props) => {
    // State to store the list of programs
    const [programs, setPrograms] = useState([]);

    // useFocusEffect hook is used to perform an action when the screen is focused
    useFocusEffect((
        // useCallback hook is used to memoize the function so that it's not recreated on every render
        useCallback(
            () => {
                // Function to fetch programs from the API when the screen is focused
                axios
                    .get(`${baseURL}gkprograms`)
                    .then((res) => {
                        // Set the fetched programs to the state
                        setPrograms(res.data);
                    });

                // Cleanup function to clear the programs when the screen is unfocused or unmounted
                return () => {
                    setPrograms([]); // Clear the programs
                };
            },
            [], // No dependencies, so the function won't be recreated
        )
    ));

    return (
       <View>
            <Text>Home</Text>
            <View style={{ marginTop: 10 }}>
                {/* FlatList to render the list of programs */}
                <FlatList 
                    numColumns={2} // Display two columns
                    data={programs} // Data source
                    renderItem={({ item }) => <ProgramList key={item.id} item={item} navigation={props.navigation} />} // Render each program item using the ProgramList component
                    keyExtractor={item => item.name} // Key extractor function to extract unique keys for each item
                />
            </View>
       </View>
    );
};

export default ProgramContainer;
