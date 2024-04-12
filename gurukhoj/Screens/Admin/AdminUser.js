import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT_ROLE } from '../../assets/common/userRole';
const AdminUser = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAdminPress = () => {
    navigation.navigate('AdminUser');
  };

  const handleTutorAdminPress = () => {
    navigation.navigate('AdminTutor');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await axios.get(`${baseURL}gkusers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      const filteredUsers = response.data.filter(user => user.gkrole.id === STUDENT_ROLE);
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <View style={styles.container}>
      {sidebarOpen && (
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.sidebarItem}>
            <Text style={styles.sidebarItemText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={handleUserAdminPress}>
            <Text style={styles.sidebarItemText}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={handleTutorAdminPress}>
            <Text style={styles.sidebarItemText}>Tutors</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.content}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Text style={styles.toggleButton}>{sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Admin Panel Dashboard</Text>
        <Text style={styles.text}>Welcome to the admin panel dashboard!</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Admin Panel</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>Name: {item.first_name} {item.last_name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Address: {item.address}</Text>
            <Text>Contact Number: {item.contact_number}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#f5fcff',
    },
    sidebar: {
      width: 200,
      backgroundColor: '#4DBFFF',
      padding: 20,
    },
    sidebarItem: {
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
      backgroundColor: '#f5fcff',
    },
    sidebarItemText: {
      color: '#444',
      fontSize: 16,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#4DBFFF',
    },
    text: {
      fontSize: 18,
      marginHorizontal: 20,
    },
    toggleButton: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'blue',
    },
  });

export default AdminUser;