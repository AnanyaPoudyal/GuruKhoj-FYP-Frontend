// import axios from 'axios';
// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TextInput, Button, Image, Alert } from 'react-native';
// import { RadioButton } from 'react-native-paper';

// const Register = () => {
//   const [firstName, setFirstName] = useState('');
//   const [firstNameVerify, setFirstNameVerify] = useState(false);
//   const [lastName, setLastName] = useState('');
//   const [lastNameVerify, setLastNameVerify] = useState(false);
//   const [address, setAddress] = useState('');
//   const [addressVerify, setAddressVerify] = useState(false);
//   const [contactNumber, setContactNumber] = useState('');
//   const [contactNumberVerify, setContactNumberVerify] = useState(false);
//   const [emailID, setEmailID] = useState('');
//   const [emailIDVerify, setemailIDVerify] = useState(false);
//   const [password, setPassword] = useState('');
//   const [passwordVerify, setpasswordVerify] = useState(false);
//  // const [image, setImage] = useState(null);
//   const [role_id, setRole_id] = useState('');
//   const [selected, setChecked] = React.useState('Student'); //initial choice


//   function handleSignUp() {
//     const userData = {
//       firstName: firstName,
//       address,
//       contactNumber,
//       emailID,
//       password,
//     }
//     if (!firstNameVerify || !lastNameVerify || !addressVerify || !contactNumberVerify || !emailIDVerify || !passwordVerify) {
//       axios.post('http://localhost:3000/api/v1/user/register', userData)
//       .then(res => {console.log(res.data)
//         if(res.data.status=="Ok"){
//           Alert.alert('Registered Successfully!');
//         }else{
//             Alert.alert(res.data);
//         }
//       })
//     }else{
//       Alert.alert('Please fill in all fields');
//     }

//     const data = new FormData();
//     data.append('first_name', firstName);
//     data.append('last_name', lastName);
//     data.append('address', address);
//     data.append('contact_number', contactNumber);
//     data.append('email_id', emailID);
//     data.append('password', password);
//     data.append('role_id', role_id);
//     // data.append('image', {
//     //   uri: image.uri,
//     //   type: image.type,
//     //   name: image.fileName,
//     // });

//     // try {
//     //   const response = await fetch('http://your-backend-url.com/api/register', {
//     //     method: 'POST',
//     //     body: data,
//     //   });
//     //   const data = await response.json();
//     //   if (data.success) {
//     //     Alert.alert('Account created successfully');
//     //     // Redirect to login page or home page
//     //   } else {
//     //     Alert.alert(data.message);
//     //   }
//     // } catch (error) {
//     //   console.error(error);
//     //   Alert.alert('An error occurred, please try again later');
//     // }
//   };



//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setImage(result);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../assets/logo.png')} style={styles.logo} />
//       <TextInput
//         style={styles.input}
//         placeholder="First Name"
//         value={firstName}
//         onChangeText={text => setFirstName(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Last Name"
//         value={lastName}
//         onChangeText={text => setLastName(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Address"
//         value={address}
//         onChangeText={text => setAddress(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone Number"
//         value={contactNumber}
//         onChangeText={text => setContactNumber(text)}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email ID"
//         value={emailID}
//         onChangeText={text => setEmailID(text)}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={text => setPassword(text)}
//         secureTextEntry
//       />
//       <Button title="Choose Image" onPress={pickImage} />
//       <Text style={styles.accountType}>Account Type:</Text>
//       <View style={styles.radioGroup}> 
//         <View style={styles.radioButton}> 
//           <RadioButton
//             value="Student" 
//             status={ selected === 'Student' ? 'checked' : 'unchecked' } //if the value of checked is std, then select this button
//             onPress={() => setChecked('Student')} //when pressed, set the value of the checked Hook to 'std'
//           />
//           <Text> Student</Text>
//         </View>
//         <View style={styles.radioButton}> 
//           <RadioButton
//             value="Tutor"
//             status={ selected === 'Tutor' ? 'checked' : 'unchecked' }
//             onPress={() => setChecked('Tutor')}
//           />
//           <Text > Tutor</Text>
//         </View>
//         <Text>{selected}</Text>
//       </View>
//      </View>
//     ); 
// };

// const styles = StyleSheet.create({
//     container: { 
//         flex: 1,
//         backgroundColor: '#fff', 
//         alignItems: 'center', 
//         justifyContent: 'center', 
//         padding: 20, 
//     },
//     logo: { 
//         width: 216, 
//         height: 69, 
//         marginBottom: 5, 
//     }, 
//     input: { 
//       borderBottomWidth: 1,
//       borderColor: 'gray',
//       marginBottom: 10,
//       paddingHorizontal: 10,
//       width: '100%',
//       height: 40, 
//     }, 
//     accountType: { 
//         fontSize: 16, 
//         fontWeight: 'bold', 
//         marginVertical: 10, 
//     }, 
//     radioGroup: { 
//       flexDirection: 'row', 
//       alignItems: 'center', 
//       justifyContent: 'space-around', 
//       marginTop: 20, 
//       borderRadius: 8, 
//       backgroundColor: 'white', 
//       padding: 16, 
//       elevation: 4, 
//       shadowColor: '#000', 
//       shadowOffset: { 
//           width: 0, 
//           height: 2, 
//       }, 
//       shadowOpacity: 0.25, 
//       shadowRadius: 3.84, 
//   }, 
//   radioButton: { 
//       flexDirection: 'row', 
//       alignItems: 'center', 
//   }, 
//   radioLabel: { 
//       marginLeft: 8, 
//       fontSize: 16, 
//       color: '#333', 
//   }, 
// });

// export default Register;