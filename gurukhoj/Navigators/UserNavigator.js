import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserScreen from "../Screens/User/UserContainer";
import StudentRegister from "../Screens/User/studentRegister";
import TutorRegister from "../Screens/User/tutorRegister";
import Login from "../Screens/User/login";
import ProgramContainer from "../Screens/Programs/ProgramContainer";
import SingleProgram from "../Screens/Programs/SingleProgram"


const Stack = createStackNavigator();

function UserStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
              <Stack.Screen
                name="User"
                component={UserScreen}
                options={{
                    headerShown: false,
                }}
            />
             <Stack.Screen
                name="StudentRegister"
                component={StudentRegister}
                options={{
                    headerShown: false,
                }}
            />
             <Stack.Screen
                name="TutorRegister"
                component={TutorRegister}
                options={{
                    headerShown: false,
                }}
            />
                        <Stack.Screen
                name="Home"
                component={ProgramContainer}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Program Details"
                component={SingleProgram}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <UserStack />;
}
