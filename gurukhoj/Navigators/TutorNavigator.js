import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import ProgramContainer from "../Screens/Programs/ProgramContainer";
import SingleProgram from "../Screens/Programs/SingleProgram"
import TutorHome from "../Screens/Tutor/TutorHome";
const Stack =  createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={TutorHome}
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

export default function TutorNavigator() {
    return <MyStack />
}