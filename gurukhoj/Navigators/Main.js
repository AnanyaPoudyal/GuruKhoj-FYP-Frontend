import React from "react";
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { View } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome"
const Tab = createBottomTabNavigator();

//Stack
import HomeNavigator from "./HomeNavigator";
import UserNavigator from "./UserNavigator";

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
                    )
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
                    )
                }}
            />  
            <Tab.Screen
                name="Profile"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                        name="cog"
                        style={{ position: "relative"}}
                        color={color}
                        size={30}
                        />
                    )
                }}
            />  
            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                        name="user"
                        style={{ position: "relative"}}
                        color={color}
                        size={30}
                        />
                    )
                }}
            />  

        </Tab.Navigator>
    )
}

export default Main;