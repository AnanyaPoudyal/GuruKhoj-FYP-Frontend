import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const FormScreen = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Name:', name);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Address:', address);
  };

  return (
    <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        
        <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={text => setDate(text)}
      />

      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={text => setTime(text)}
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={text => setAddress(text)}
        multiline
      />



      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 70,
  },
  logo: {
    width: 216, 
    height: 69, 
    padding: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  label: {
    fontSize: 17,
    color: 'gray',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    height: 40,
  },
  button: {
    backgroundColor: '#4DBFFF',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default FormScreen;