import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Icon, Button, Input } from 'react-native-elements';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminTutor = ({ navigation }) => {
  const [tutors, setTutors] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingTutorId, setEditingTutorId] = useState(null);
  const [editedTutor, setEditedTutor] = useState({});

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

  const handleEditTutor = (tutorId) => {
    setEditingTutorId(tutorId);
    const tutorToEdit = tutors.find(tutor => tutor.id === tutorId);
    setEditedTutor(tutorToEdit);
  };

  const handleSaveTutor = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      await axios.put(`${baseURL}gktutors/${editingTutorId}`, editedTutor, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditingTutorId(null);
      fetchTutors();
    } catch (error) {
      console.error('Error saving tutor:', error);
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
          <Text style={styles.toggleButton}>{sidebarOpen ? '=' : '='}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Admin Panel Tutor</Text>
        <FlatList
          data={tutors}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem bottomDivider>
            <Icon name="user" type="font-awesome" />
            {editingTutorId === item.id ? (
              <View style={styles.editingContainer}>
                <Input
                  label="Program Area"
                  value={editedTutor.area}
                  onChangeText={(text) => setEditedTutor({...editedTutor, area: text})}
                />
                <Input
                  label="Degree"
                  value={editedTutor.degree}
                  onChangeText={(text) => setEditedTutor({...editedTutor, degree: text})}
                />
                <Input
                  label="GPA"
                  value={editedTutor.gpa}
                  onChangeText={(text) => setEditedTutor({...editedTutor, gpa: text})}
                />
                <Input
                  label="Institution Name"
                  value={editedTutor.instiuteName}
                  onChangeText={(text) => setEditedTutor({...editedTutor, instiuteName: text})}
                />
                <Button
                  title="Save"
                  onPress={handleSaveTutor}
                />
              </View>
            ) : (
              <ListItem.Content>
                <ListItem.Title>{item.gkuser?.first_name || 'Not available'} {item.gkuser?.last_name || ''}</ListItem.Title>
                <ListItem.Subtitle>Email: {item.gkuser?.email || 'Not available'}</ListItem.Subtitle>
                <ListItem.Subtitle>Address: {item.gkuser?.address || 'Not available'}</ListItem.Subtitle>
                <ListItem.Subtitle>Contact Number: {item.gkuser?.contact_number || 'Not available'}</ListItem.Subtitle>
                <ListItem.Subtitle>Program Area: {item.area}</ListItem.Subtitle>
                <ListItem.Subtitle>Degree: {item.degree}</ListItem.Subtitle>
                <ListItem.Subtitle>GPA: {item.gpa}</ListItem.Subtitle>
                <ListItem.Subtitle>Institution Name: {item.instiuteName}</ListItem.Subtitle>
              </ListItem.Content>
            )}
            <View style={styles.actionButtons}>
              {!editingTutorId && (
                <Button
                  icon={<Icon name="edit" type="font-awesome" color="#fff" />}
                  buttonStyle={styles.editButton}
                  onPress={() => handleEditTutor(item.id)}
                />
              )}
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
  editButton: {
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  editingContainer: {
    flex: 1,
  }
});

export default AdminTutor;
