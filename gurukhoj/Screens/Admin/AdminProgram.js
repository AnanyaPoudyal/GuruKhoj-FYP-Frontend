import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Icon, Button, Input } from 'react-native-elements';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminProgram = ({ navigation }) => {
  const [programs, setPrograms] = useState([]);
  const [editingProgramId, setEditingProgramId] = useState(null);
  const [editedProgram, setEditedProgram] = useState({});

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await axios.get(`${baseURL}gkprograms`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const handleEditProgram = (programId) => {
    setEditingProgramId(programId);
    const programToEdit = programs.find(program => program.id === programId);
    setEditedProgram(programToEdit);
  };

  const handleSaveProgram = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      await axios.put(`${baseURL}gkprograms/${editingProgramId}`, editedProgram, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditingProgramId(null);
      fetchPrograms();
    } catch (error) {
      console.error('Error saving program:', error);
    }
  };

  const handleDeleteProgram = async (programId) => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      await axios.delete(`${baseURL}gkprograms/${programId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  const confirmDeleteProgram = (programId) => {
    Alert.alert(
      'Delete Program',
      'Are you sure you want to delete this program?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => handleDeleteProgram(programId) }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel Program</Text>
      <FlatList
        data={programs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              {editingProgramId === item.id ? (
                <View style={styles.editingContainer}>
                  <Input
                    label="Area"
                    value={editedProgram.gkprogramArea}
                    onChangeText={(text) => setEditedProgram({...editedProgram, gkprogramArea: text})}
                  />
                  <Input
                    label="Subject"
                    value={editedProgram.gkprogramSubject}
                    onChangeText={(text) => setEditedProgram({...editedProgram, gkprogramSubject: text})}
                  />
                  <Input
                    label="Address"
                    value={editedProgram.gkprogramAddress}
                    onChangeText={(text) => setEditedProgram({...editedProgram, gkprogramAddress: text})}
                  />
                  <Input
                    label="Price"
                    value={editedProgram.gkprogramPrice}
                    onChangeText={(text) => setEditedProgram({...editedProgram, gkprogramPrice: text})}
                  />
                  <Input
                    label="Student Capacity"
                    value={editedProgram.gkprogramStudentCapacity}
                    onChangeText={(text) => setEditedProgram({...editedProgram, gkprogramStudentCapacity: text})}
                  />
                  <Button
                    title="Save"
                    onPress={handleSaveProgram}
                  />
                </View>
              ) : (
                <>
                  <ListItem.Title>Area: {item.gkprogramArea}</ListItem.Title>
                  <ListItem.Subtitle>Subject: {item.gkprogramSubject}</ListItem.Subtitle>
                  <ListItem.Subtitle>Address: {item.gkprogramAddress}</ListItem.Subtitle>
                  <ListItem.Subtitle>Price: {item.gkprogramPrice}</ListItem.Subtitle>
                  <ListItem.Subtitle>Student Capacity: {item.gkprogramStudentCapacity}</ListItem.Subtitle>
                </>
              )}
            </ListItem.Content>
            <View style={styles.actionButtons}>
              {!editingProgramId && (
                <Button
                  icon={<Icon name="edit" type="font-awesome" color="#fff" />}
                  buttonStyle={styles.editButton}
                  onPress={() => handleEditProgram(item.id)}
                />
              )}
              <Button
                icon={<Icon name="trash" type="font-awesome" color="#fff" />}
                buttonStyle={styles.deleteButton}
                onPress={() => confirmDeleteProgram(item.id)}
              />
            </View>
          </ListItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4DBFFF',
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

export default AdminProgram;
