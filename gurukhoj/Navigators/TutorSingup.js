import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TutorRegister from "../Screens/User/tutorRegister";
import TutorDetail from "../Screens/User/tutorDetail";


const Stack = createStackNavigator();

function SignUpStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="TutorRegister"
                component={TutorRegister}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="TutorDetail"
                component={TutorDetail}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function TutorSingup() {
    return <SignUpStack />
}
