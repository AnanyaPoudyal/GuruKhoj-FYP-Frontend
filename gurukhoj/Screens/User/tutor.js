import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tutor = ({ navigation }) => {
  const [allUser, setAllUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [alphabetFilter, setAlphabetFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

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
      setFilteredUser(tutorUsers);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  const handleProfilePress = userId => {
    navigation.navigate('UserProfile', { userId });
  };

  const applyFilters = () => {
    let filtered = allUser.filter(user => {
      let alphabetMatch = true;
      let locationMatch = true;

      if (alphabetFilter) {
        alphabetMatch = user.first_name.toLowerCase().startsWith(alphabetFilter.toLowerCase());
      }

      if (locationFilter) {
        locationMatch = user.address.toLowerCase().includes(locationFilter.toLowerCase());
      }

      return alphabetMatch && locationMatch;
    });

    setFilteredUser(filtered);
  };

  const UserCard = ({ data }) => (
    <TouchableOpacity onPress={() => handleProfilePress(data._id)}>
      <View style={styles.cardContainer}>
        <Image
          source={{ uri: data.photo || "https://m.media-amazon.com/images/I/8179uEK+gcL._AC_UF1000,1000_QL80_.jpg" }}
          style={styles.userPhoto}
          onError={(error) => console.error('Error loading image:', error)}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{data.first_name} {data.last_name}</Text>
          <Text style={styles.userName}>{data.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filterInput}
          value={alphabetFilter}
          onChangeText={setAlphabetFilter}
          placeholder="Filter by alphabet"
        />
        <TextInput
          style={styles.filterInput}
          value={locationFilter}
          onChangeText={setLocationFilter}
          placeholder="Filter by location"
        />
        <TouchableOpacity style={styles.filterButton} onPress={applyFilters}>
          <Text style={styles.filterButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredUser}
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: '#4DBFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
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

export default Tutor;
