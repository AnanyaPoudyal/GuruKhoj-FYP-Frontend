import React, { useState } from 'react';
import axios from 'axios';
import Register from './Register';
import Home from './Home';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';


function Login({props}){
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleLogin(){
    console.log(email, password);
    const userData={
      email: email,
      password: password
    }
    axios
    .post("http://localhost:3000/api/v1/gkusers/login", userData)
    .then(res=>{console.log(res.data);
    if(res.data.status=='Ok'){
      
      Alert.alert('Logged In Sucessfully');
      navigation.navigate(Home);
    }
    });
  };

  return (
    <View style={styles.container}>
    <Image source={require('../assets/logo.png')} style={styles.logo} />
    <Image source={require('../assets/login.png')} style={styles.img} />
    <Text style={styles.title}>Login</Text>
      <TextInput 
        style={styles.input}
        placeholder="Email ID"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(Register)}>
        <Text style={styles.link}>Don't have an account? Register here.</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20,
  },
  logo: {
    width: 216, 
    height: 69, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  img: {
    width: 216,
    height: 250
  },
  title: {
    color: '#4DBFFF',
    fontSize: 36,
    fontWeight: 400,
    // wordWrap: 'break-word',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  register: {
    alignSelf: 'center',
  },
  registerText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default Login;