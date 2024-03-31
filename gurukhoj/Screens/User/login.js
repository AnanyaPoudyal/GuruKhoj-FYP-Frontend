import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import FormContainer from "../Shared/Form/FormContainer";
import Input from "../Shared/Form/Input";
import Error from "../Shared/Error";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

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
          const token = response.data.token; // Assuming the token is returned in the response
          // You can store the token in AsyncStorage or some other local storage mechanism
          // Redirect to the authenticated screen or perform any other actions
          console.log("Login successful. Token:", token);
        })
        .catch((error) => {
          setError("Invalid email or password");
          console.error("Login error:", error);
        });
    }
  };

  return (
    <FormContainer >
      <Image source={require('../../assets/login.png')} style={styles.img} />
      <Input
        style={styles.input}
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        style={styles.input}
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
          onPress={() => props.navigation.navigate("TutorRegister")}
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
