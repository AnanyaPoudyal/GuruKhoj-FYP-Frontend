import React from "react";
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { View } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome"
const Tab = createBottomTabNavigator();

//Stack
import HomeNavigator from "./HomeNavigator";
import UserNavigator from "./UserNavigator";
import SearchScreen from "../Screens/User/SearchScreen";
import UserScreen from "../Screens/User/UserContainer";
import SearchNavigator from "./SearchNavigator";

const Main = () => {
    return (
        <Tab.Navigator initialRouteName="Home"
        tabBarOptions = {{
            keyboardHidesTabBar: true,
            showLabel: false,
            activeTintColor: '#4DBFFF'
        }}>
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
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
                name="Cart"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                        name="shopping-cart"
                        style={{ position: "relative"}}
                        color={color}
                        size={30}
                        />
                    ),
                    headerShown: false
                }}
            />  
            <Tab.Screen
                name="Search"
                component={SearchNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                        name="search"
                        style={{ position: "relative"}}
                        color={color}
                        size={30}
                        />
                    ),
                    headerShown: false
                }}
            />  
            <Tab.Screen
                name="User"
                component={UserScreen}
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

        </Tab.Navigator>
    )
}

export default Main;