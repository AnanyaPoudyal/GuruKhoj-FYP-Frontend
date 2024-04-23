import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setQuery] = useState('');
  const [filteredUser, setFilteredUser] = useState([]);
  const [allUser, setAllUser] = useState([]);

  async function getAllData() {
    try {
        const token = await AsyncStorage.getItem('AccessToken');
        const response = await axios.get(`${baseURL}gkusers/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        const tutorUsers = response.data.filter(user => user.gkrole.gkUserRole === 'Tutor');
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
      navigation.navigate('UserProfile', { userId  });
    };

    const UserCard = ({data}) => (
      <TouchableOpacity onPress={() => handleProfilePress(data._id)}>
        <View style={styles.cardContainer}>
          <Image
            source={{ uri: data.photo || "https://m.media-amazon.com/images/I/8179uEK+gcL._AC_UF1000,1000_QL80_.jpg"}}
            style={styles.userPhoto}
            onError={(error) => console.error('Error loading image:', error)}
          />
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
        data={searchQuery.length > 0 ? filteredUser : allUser}
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
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    height: 40,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4DBFFF',
  },
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default SearchScreen;
