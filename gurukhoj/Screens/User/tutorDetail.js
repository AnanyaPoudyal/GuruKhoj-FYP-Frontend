import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import FormContainer from "../Shared/Form/FormContainer";
import Input from "../Shared/Form/Input";
import Error from "../Shared/Error";
import EasyButton from "../Shared/EasyButton";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const TutorDetail = (props) => {
  const [instiuteName, setInstiuteName] = useState("");
  const [degree, setDegree] = useState("");
  const [area, setArea] = useState("");
  const [gpa, setGpa] = useState("");
  const [graduatedDate, setGraduatedDate] = useState("");
  const [error, setError] = useState("");

  const registerTutorDetails = () => {
    if (
      instiuteName === "" ||
      degree === "" ||
      area === "" ||
      gpa === "" ||
      graduatedDate === ""
    ) {
      setError("Please fill in the form correctly");
      return;
    }

    const dateObject = new Date(graduatedDate);
    const isoDateString = dateObject.toISOString();

    let tutorDetails = {
      instiuteName: instiuteName,
      degree: degree,
      area: area,
      gpa: gpa,
      graduatedDate: isoDateString,
      gkuser: props.route.params.userId,
    };

    console.log("Tutor Details:", tutorDetails);

    axios
      .post(`${baseURL}gktutors`, tutorDetails)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setError("");
          props.navigation.navigate("Login");
        }
      })
      .catch((error) => {
        setError("Something went wrong. Please try again.");
        console.error("Error registering tutor details:", error);
      });
  };

  return (
    <FormContainer>
      <Text style={styles.title}>Tutor Details</Text>
      <Input
        placeholder={"Institute Name"}
        name={"instiuteName"}
        id={"instiuteName"}
        onChangeText={(text) => setInstiuteName(text)}
      />
      <Input
        placeholder={"Degree"}
        name={"degree"}
        id={"degree"}
        onChangeText={(text) => setDegree(text)}
      />
      <Input
        placeholder={"Area"}
        name={"area"}
        id={"area"}
        onChangeText={(text) => setArea(text)}
      />
      <Input
        placeholder={"GPA"}
        name={"gpa"}
        id={"gpa"}
        onChangeText={(text) => setGpa(text)}
      />
      <Input
        placeholder={"Graduated Date (YYYY-MM-DD)"}
        name={"graduatedDate"}
        id={"graduatedDate"}
        onChangeText={(text) => setGraduatedDate(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
      </View>
      <View>
        <EasyButton large primary onPress={() => registerTutorDetails()}>
          <Text style={{ color: "white" }}>Register</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#4DBFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default TutorDetail;
