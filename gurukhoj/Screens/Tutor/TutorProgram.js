// StudentRegister.js

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

const TutorProgram = (props) => {
  const [gkprogramArea, setGkprogramArea] = useState("");
  const [gkprogramSubject, setGkprogramSubject] = useState("");
  const [gkprogramAddress, setGkprogramAddress] = useState("");
  const [gkprogramStartTime, setGkprogramStartTime] = useState("");
  const [gkprogramEndTime, setGkprogramEndTime] = useState("");
  const [gkprogramPrice, setGkprogramPrice] = useState("");
  const [gkprogramStudentCapacity, setGkprogramStudentCapacity] = useState("");
  const [gkprogramHomeTution, setGkprogramHomeTution] = useState("");
  
  const [error, setError] = useState("");

  const postProgram = () => {
    if (
      gkprogramArea === "" ||
      gkprogramSubject === "" ||
      gkprogramAddress === "" ||
      gkprogramStartTime === "" ||
      gkprogramEndTime === "" ||
      gkprogramPrice === "" ||
      gkprogramStudentCapacity === "" ||
      gkprogramHomeTution === ""
    ) {
      setError("Please fill in the form correctly");
      return;
    }

    let program = {
      gkprogramArea: gkprogramArea,
      gkprogramSubject: gkprogramSubject,
      gkprogramAddress: gkprogramAddress, // Set isAdmin to false
      gkprogramStartTime: gkprogramStartTime,
      gkprogramEndTime: gkprogramEndTime, // Update to match the database column name
      gkprogramPrice: gkprogramPrice,
      gkprogramStudentCapacity: gkprogramStudentCapacity,
      gkprogramHomeTution: gkprogramHomeTution,
    };

    axios
      .post(`${baseURL}gkprograms/`, program)
      .then((res) => {
        if (res.status === 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Program Created",
            text2: "Your program is scuccesfully created",
          });
          setTimeout(() => {
            props.navigation.navigate("TutorHome");
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
      <Text style={styles.title}>Create a Program</Text>

      <View style={styles.box}>
        <Input
          placeholder={"Program Area"}
          name={"gkprogramArea"}
          id={"gkprogramArea"}
          onChangeText={(text) => setGkprogramArea(text)}
        />
        <Input
          placeholder={"Subject"}
          name={"gkprogramSubject"}
          id={"gkprogramSubject"}
          onChangeText={(text) => setGkprogramSubject(text)}
        />
        <Input
          placeholder={"Address"}
          name={"gkprogramAddress"}
          id={"gkprogramAddress"}
          onChangeText={(text) => setGkprogramAddress(text)}
        />
        <Input
          placeholder={"Start Time "}
          name={"gkprogramStartTime"}
          id={"gkprogramStartTime"}
          onChangeText={(text) => setGkprogramStartTime(text)}
        />
        <Input
          placeholder={"End Time"}
          name={"gkprogramEndTime"}
          id={"gkprogramEndTime"}
          onChangeText={(text) => setGkprogramEndTime(text)}
        />
        <Input
          placeholder={"Price"}
          name={"gkprogramPrice"}
          id={"gkprogramPrice"}
          onChangeText={(text) => setGkprogramPrice(text)}
        />
        <Input
          placeholder={"Number of Student"}
          name={"gkprogramStudentCapacity"}
          id={"gkprogramStudentCapacity"}
          keyboardType={"numeric"}
          onChangeText={(text) => setGkprogramStudentCapacity(text)}
        />
        <Input
          placeholder={"Home Tutiton"}
          name={"gkprogramHomeTution"}
          id={"gkprogramHomeTution"}
          onChangeText={(text) => setGkprogramHomeTution(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large secondary onPress={() => postProgram()}>
            <Text style={{ color: "white" }}>Post</Text>
          </EasyButton>
        </View>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
    box: {
        position: 'relative',
        height: '100%',
        width: '100%',
        borderWidth: 5,
        borderColor: '#4DBFFF',
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
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

export default TutorProgram;
