import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import SearchScreen from "../Screens/User/SearchScreen";
import UserProfile from "../Screens/User/UserProfile";
import Feedback from "../Screens/User/Feedback";

const Stack = createStackNavigator()

function SearchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Search"
                component={SearchScreen}
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

export default function SearchNavigator() {
    return <SearchStack />
}