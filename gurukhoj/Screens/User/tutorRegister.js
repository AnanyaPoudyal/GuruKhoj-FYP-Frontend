// TutorRegister.js

import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import FormContainer from "../Shared/Form/FormContainer";
import Input from "../Shared/Form/Input";
import Error from "../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../Shared/EasyButton";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const TutorRegister = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registerTutor = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      contactNumber === "" ||
      email === "" ||
      password === ""
    ) {
      setError("Please fill in the form correctly");
      return;
    }

    let tutor = {
      first_name: firstName,
      last_name: lastName,
      isAdmin: false, // Set isAdmin to false
      address: address,
      contact_number: contactNumber, // Update to match the database column name
      email: email,
      password: password,
      gkrole: "65e16652761b2965c3fd0330",
    };

    axios
      .post(`${baseURL}gkusers/register`, tutor)
      .then((res) => {
        if (res.status === 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please login to your account",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer >
      <Text style={styles.title}>Create Tutor</Text>
      <Text style={styles.title}> Account</Text>
        <Input
          placeholder={"First Name"}
          name={"firstName"}
          id={"firstName"}
          onChangeText={(text) => setFirstName(text)}
        />
        <Input
          placeholder={"Last Name"}
          name={"lastName"}
          id={"lastName"}
          onChangeText={(text) => setLastName(text)}
        />
        <Input
          placeholder={"Address"}
          name={"address"}
          id={"address"}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Contact Number"}
          name={"contactNumber"}
          id={"contactNumber"}
          keyboardType={"numeric"}
          onChangeText={(text) => setContactNumber(text)}
        />
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large primary onPress={() => registerTutor()}>
            <Text style={{ color: "white" }}>Register</Text>
          </EasyButton>
        </View>
        <View>
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Back to Login</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#4DBFFF',
    fontSize: 36,
    fontWeight: 400,
    // wordWrap: 'break-word',
  },
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default TutorRegister;
