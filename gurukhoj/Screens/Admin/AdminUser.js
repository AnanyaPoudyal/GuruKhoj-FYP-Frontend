import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminUser = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleSidebar = () => {
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
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditUser = (userId) => {
    navigation.navigate('EditUser', { userId });
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      await axios.delete(`${baseURL}gkusers/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const confirmDeleteUser = (userId) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => handleDeleteUser(userId) }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {sidebarOpen && (
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.sidebarItem}>
            <Text style={styles.sidebarItemText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={handleToggleSidebar}>
            <Text style={styles.sidebarItemText}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('AdminTutor')}>
            <Text style={styles.sidebarItemText}>Tutors</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.content}>
        <TouchableOpacity onPress={handleToggleSidebar}>
          <Text style={styles.toggleButton}>{sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Admin Panel User</Text>
        <FlatList
          data={users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem bottomDivider>
              <Icon name="user" type="font-awesome" />
              <ListItem.Content>
                <ListItem.Title>{item.first_name} {item.last_name}</ListItem.Title>
                <ListItem.Subtitle>Email: {item.email}</ListItem.Subtitle>
                <ListItem.Subtitle>Address: {item.address}</ListItem.Subtitle>
                <ListItem.Subtitle>Contact Number: {item.contact_number}</ListItem.Subtitle>
              </ListItem.Content>
              <View style={styles.actionButtons}>
                <Button
                  icon={<Icon name="edit" type="font-awesome" color="#fff" />}
                  buttonStyle={styles.editButton}
                  onPress={() => handleEditUser(item.id)}
                />
                <Button
                  icon={<Icon name="trash" type="font-awesome" color="#fff" />}
                  buttonStyle={styles.deleteButton}
                  onPress={() => confirmDeleteUser(item.id)}
                />
              </View>
            </ListItem>
          )}
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
  toggleButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue',
  },
  actionButtons: {
    flexDirection: 'row',
    marginRight: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
});

export default AdminUser;
