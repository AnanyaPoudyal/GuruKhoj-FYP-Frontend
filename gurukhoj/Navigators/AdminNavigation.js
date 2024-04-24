import React from "react";
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { View } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome"
import AdminScreen from "../Screens/Admin/AdminScreen";
import AdminTutor from "../Screens/Admin/AdminTutor";
import AdminUser from "../Screens/Admin/AdminUser";
import AdminProgram from "../Screens/Admin/AdminProgram";
const Tab = createBottomTabNavigator();

//Stack


const AdminNavigation = () => {
    return (
        <Tab.Navigator initialRouteName="Admin"
        tabBarOptions = {{
            keyboardHidesTabBar: true,
            showLabel: false,
            activeTintColor: '#4DBFFF'
        }}>
            <Tab.Screen
                name="AdminScreen"
                component={AdminScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                        name="home"
                        style={{ position: "relative"}}
                        color={color}
                        size={30}
                        />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="AdminUser"
                component={AdminUser}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                        name="user"
                        style={{ position: "relative"}}
                        color={color}
                        size={30}
                        />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="AdminTutor"
                component={AdminTutor}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                        name="edit"
                        style={{ position: "relative"}}
                        color={color}
                        size={30}
                        />
                    ),
                    headerShown: false
                }}
            />  
            <Tab.Screen
                name="AdminProgram"
                component={AdminProgram}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                        name="book"
                        style={{ position: "relative"}}
                        color={color}
                        size={30}
                        />
                    ),
                    headerShown: false
                }}
            />  
        </Tab.Navigator>
    )
}

export default AdminNavigation;