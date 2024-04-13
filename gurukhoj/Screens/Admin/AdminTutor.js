import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminTutor = ({ navigation }) => {
  const [tutors, setTutors] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchTutors = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await axios.get(`${baseURL}gktutors`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTutors(response.data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  const handleDeleteTutor = async (tutorId) => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      await axios.delete(`${baseURL}gktutors/${tutorId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchTutors();
    } catch (error) {
      console.error('Error deleting tutor:', error);
      Alert.alert('Error', 'Failed to delete tutor. Please try again later.');
    }
  };

  const confirmDeleteTutor = (tutorId) => {
    Alert.alert(
      'Delete Tutor',
      'Are you sure you want to delete this tutor?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => handleDeleteTutor(tutorId) }
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
        <Text style={styles.title}>Admin Panel Tutor</Text>
        <FlatList
          data={tutors}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem bottomDivider>
              <Icon name="user" type="font-awesome" />
              <ListItem.Content>
                <ListItem.Title>{item.gkuser.first_name} {item.gkuser.last_name}</ListItem.Title>
                <ListItem.Subtitle>Email: {item.gkuser.email}</ListItem.Subtitle>
                <ListItem.Subtitle>Address: {item.gkuser.address}</ListItem.Subtitle>
                <ListItem.Subtitle>Contact Number: {item.gkuser.contact_number}</ListItem.Subtitle>
                <ListItem.Subtitle>Program Area: {item.area}</ListItem.Subtitle>
                <ListItem.Subtitle>Degree: {item.degree}</ListItem.Subtitle>
                <ListItem.Subtitle>GPA: {item.gpa}</ListItem.Subtitle>
                <ListItem.Subtitle>Institution Name: {item.instiuteName}</ListItem.Subtitle>
              </ListItem.Content>
              <View style={styles.actionButtons}>
                <Button
                  icon={<Icon name="trash" type="font-awesome" color="#fff" />}
                  buttonStyle={styles.deleteButton}
                  onPress={() => confirmDeleteTutor(item.id)}
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
  deleteButton: {
    backgroundColor: '#F44336',
  },
});

export default AdminTutor;
