import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import ProgramContainer from "../Screens/Programs/ProgramContainer";
import SingleProgram from "../Screens/Programs/SingleProgram"
const Stack =  createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
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

export default function HomeNavigator() {
    return <MyStack />
}