import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image } from 'react-native';
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


const SearchScreen = ({ navigation }) => {
  const [searchQuery, setQuery] = useState('');
  const [filteredUser, setFilteredUser] = useState([]);
  const [allUser, setAllUser] = useState([]);

  async function getAllData() {
    try {
        // Make an API call to retrieve search results
        const token = await AsyncStorage.getItem('AccessToken');
        const response = await axios.get(`${baseURL}gkusers/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        // Filter users by role 'Tutor'
        const tutorUsers = response.data.filter(user => user.gkrole.gkUserRole === 'Tutor');
        
        // Set the filtered users state
        setAllUser(tutorUsers);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

  const handleSearch = query => {
    setQuery(query);
    const filtered = allUser.filter(
      user =>
      typeof query === 'string' &&
      user.first_name.toLowerCase().includes(query.toLowerCase())
    );
setFilteredUser(filtered);
    };
    useEffect(() => {
      getAllData();
    }, []);

    const handleProfilePress = userId => {
      // Navigate to the user's profile screen
      navigation.navigate('UserProfile', { userId  });
    };
  

    const UserCard = ({data}) => (
      <TouchableOpacity onPress={() => handleProfilePress(data._id)}>
    <View style={styles.cardContainer}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{data.first_name} {data.last_name}</Text>
      </View>
    </View>
  </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
        placeholder="Search..."
      />

      <Button  style={styles.searchButton} title="Search" onPress={handleSearch} />

      <FlatList
          data={searchQuery.length>0?filteredUser:allUser}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <UserCard data={item} />}
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
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5', // Light gray background color
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2, // Add elevation for shadow (Android)
    shadowColor: '#000', // Add shadow color (iOS)
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'Italic',
    color: '#4DBFFF', 
    marginBottom: 5,
  },
});


export default SearchScreen;

