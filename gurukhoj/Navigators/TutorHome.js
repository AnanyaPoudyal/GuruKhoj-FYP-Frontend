import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import Tutor from "../Screens/User/tutor";
import UserProfile from "../Screens/User/UserProfile";
import Feedback from "../Screens/User/Feedback";
const Stack = createStackNavigator()

function TutStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Tutor"
                component={Tutor}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="UserProfile"
                component={UserProfile}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Feedback"
                component={Feedback}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function TutorHome() {
    return <TutStack />
}