import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image } from 'react-native';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Make an API call to retrieve search results
    fetch(`http://localhost:3000/api/v1/gktutors?q=${query}`)
      .then(response => response.json())
      .then(data => setResults(data.results))
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
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
          <View style={styles.result}>
            <Text style={styles.resultTitle}>{item.title}</Text>
            <Text style={styles.resultDescription}>{item.description}</Text>
          </View>
        )}
      />
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