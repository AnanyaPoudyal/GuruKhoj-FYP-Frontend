import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import FormContainer from "../Shared/Form/FormContainer";
import Input from "../Shared/Form/Input";
import Error from "../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../Shared/EasyButton";
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker from Expo

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
  const [image, setImage] = useState(null); // State for storing selected image URI

  // Request permission to access the device's image gallery
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log("Image picked:", result);
  
    if (!result.cancelled) {
      const selectedImageUri = result.assets[0].uri; // Access the URI from the assets array
      setImage(selectedImageUri);
      console.log("Image uri:", selectedImageUri);
    }
  };
  
  const registerStudent = async () => {
    if (
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      contactNumber === "" ||
      email === "" ||
      password === "" ||
      !image // Check if image is not defined
    ) {
      setError("Please fill in the form correctly");
      return;
    }
  

// Create a new FormData object
let tutorData = new FormData();

// Append the image to the form data
let localUri = image;
let filename = localUri.split("/").pop();

// Infer the type of the image
let match = /\.(\w+)$/.exec(filename);
let type = match ? `image/${match[1]}` : `image`;

// Append the image to the form data
tutorData.append("photo", { uri: localUri, name: filename, type });

// Append other fields to the form data
tutorData.append("first_name", firstName);
tutorData.append("last_name", lastName);
tutorData.append("address", address);
tutorData.append("contact_number", contactNumber);
tutorData.append("email", email);
tutorData.append("password", password);
tutorData.append("gkrole", "65e16652761b2965c3fd0330");

    axios
      .post(`${baseURL}gkusers/register`, tutorData)
      .then((res) => {
        if (res.status === 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please login to your account",
          });
          console.log({userId: res.data.id} );
          setTimeout(() => {
            props.navigation.navigate("TutorDetail", { userId: res.data.id });
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
                <View>
          <EasyButton large primary onPress={pickImage}>
            <Text style={{ color: "white" }}>Select Photo</Text>
          </EasyButton>
        </View>

        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large primary onPress={() => registerStudent()}>
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
