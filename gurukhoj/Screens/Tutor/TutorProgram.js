import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import FormContainer from "../Shared/Form/FormContainer";
import Input from "../Shared/Form/Input";
import Error from "../Shared/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../Shared/EasyButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [gkprogramHomeTution, setGkprogramHomeTution] = useState(null);
  const [gkuser, setGkuser] = useState("");
  const [error, setError] = useState("");


  const postProgram = async () => {
    const userId = await AsyncStorage.getItem('UserId');
    const accessToken = await AsyncStorage.getItem('AccessToken');

    if (!accessToken) {
      console.error('Access token not found');
      return;
    }
    
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
      gkprogramArea,
      gkprogramSubject,
      gkprogramAddress,
      gkprogramStartTime,
      gkprogramEndTime,
      gkprogramPrice,
      gkprogramStudentCapacity,
      gkprogramHomeTution,
      gkuser: userId
    };

    try {
      const res = await axios.post(`${baseURL}gkprograms/`, program, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (res.status === 200) {
        Alert.alert(
          "Program Created",
          "The program has been added successfully",
          [
            {
              text: "OK",
              onPress: () => {
              }
            }
          ]
        );
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error creating program:", error);
    }
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer>
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
            placeholder={"Start Time"}
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
            placeholder={"Number of Students"}
            name={"gkprogramStudentCapacity"}
            id={"gkprogramStudentCapacity"}
            keyboardType={"numeric"}
            onChangeText={(text) => setGkprogramStudentCapacity(text)}
          />
          {/* Radio button group */}
          <View style={styles.radioGroupContainer}>
            <Text style={styles.radioGroupLabel}>Home Tuition</Text>
            <View style={styles.radioButtons}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  gkprogramHomeTution === true && styles.selectedRadioButton
                ]}
                onPress={() => setGkprogramHomeTution(true)}
              >
                <Text style={styles.radioButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  gkprogramHomeTution === false && styles.selectedRadioButton
                ]}
                onPress={() => setGkprogramHomeTution(false)}
              >
                <Text style={styles.radioButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Error message */}
          <View style={styles.buttonGroup}>
            {error ? <Error message={error} /> : null}
          </View>
          {/* Post button */}
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
    fontWeight: '400',
    marginBottom: 20,
  },
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
  radioGroupContainer: {
    width: "80%",
    marginVertical: 10,
    alignItems: "center",
  },
  radioGroupLabel: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '500',
  },
  radioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#4DBFFF',
    borderRadius: 20,
    padding: 10,
    width: 100,
    alignItems: 'center',
  },
  selectedRadioButton: {
    backgroundColor: '#4DBFFF',
  },
  radioButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default TutorProgram;