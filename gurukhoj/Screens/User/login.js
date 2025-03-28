import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import FormContainer from "../Shared/Form/FormContainer";
import Input from "../Shared/Form/Input";
import Error from "../Shared/Error";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import {STUDENT_ROLE, TUTOR_ROLE, ADMIN_ROLE} from "../../assets/common/userRole";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (email === "" || password === "") {
      setError("Please Fill in your credentials");
    } else {
      axios
        .post(`${baseURL}gkusers/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          if(response.status == 200) {
            const token = response.data.token;
            const userId = response.data.user.userID; // Extracting user ID from the response
            const gkRole = response.data.user.gkrole;
            AsyncStorage.setItem("AccessToken", token); // Storing the access token
            AsyncStorage.setItem("UserId", userId); // Storing the user ID
            if(gkRole == STUDENT_ROLE){
              props.navigation.navigate("Home")
            }
            if(gkRole == TUTOR_ROLE){
              props.navigation.navigate("TutorHome")
            }
            if(gkRole == ADMIN_ROLE){
              props.navigation.navigate("Admin")
            }
            console.log("Login successful. Token:", userId);
          }
        })
        .catch((error) => {
          setError("Invalid email or password");
          console.error("Login error:", error);
        });
    }
  };
  //temp function to check lsd
  const getLocalStrorageDate =  async () => {
    let data = await AsyncStorage.getItem('@auth')
    console.log('Local Storage ========>> ', data)
  }
  getLocalStrorageDate();
  return (
    <FormContainer >
      <Image source={require('../../assets/login.png')} style={styles.img} />
      <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.button}>
        {error !== "" && <Error message={error} />}
        <Button title="Login" onPress={handleSubmit} />
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet? Join as a Student </Text>
        <Button
          style={styles.button}
          title="Student Register"
          onPress={() => props.navigation.navigate("StudentRegister")}
        />
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Join as Tutor </Text>
        <Button
          style={styles.button}
          title="Tutor Register"
          onPress={() => props.navigation.navigate("TutorSingup")}
        />
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
  img: {
    width: 216,
    height: 250
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

export default Login;
