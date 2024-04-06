import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image } from 'react-native';
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    // Make an API call to retrieve search results
    const token = await AsyncStorage.getItem('AccessToken');
    axios
        .post(`${baseURL}gkusers/search?first_name=${encodeURIComponent(query)}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then(response => {
          setResults(response.data);
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
          } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error setting up the request:', error.message);
          }
        });
    };

  return (
    <View style={styles.container}>
        {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={text => setQuery(text)}
        placeholder="Search..."
      />

      <Button title="Search" onPress={handleSearch} />

      <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text>Name: {item.name}</Text>
            </View>
          )}
        />
      <View style={styles.tabContainer}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    height: 40,
  },
  tabContainer: {
    position: 'absolute', // Position the tab navigator absolutely
    bottom: 0, // Stick it to the bottom
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: 'lightgray',
  },
  logo: {
    width: 216, 
    height: 69, 
    padding: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  result: {
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultDescription: {
    fontSize: 14,
    color: 'gray',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});


export default SearchScreen;

