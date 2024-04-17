<<<<<<< HEAD
import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
// import { WebView } from 'react-native-webview';
=======
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AdminTutor from './AdminTutor';
import AdminUser from './AdminUser';
>>>>>>> Admin

const AdminScreen = ({ navigation }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleUserAdminPress = () => {
    navigation.navigate('AdminUser');
  };

  const handleTutorAdminPress = () => {
    navigation.navigate('AdminTutor');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
<<<<<<< HEAD
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* <WebView source={{ uri: adminPanelUrl }} /> */}
    </SafeAreaView>
=======
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
      </View>
    </View>
>>>>>>> Admin
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

export default AdminScreen;
