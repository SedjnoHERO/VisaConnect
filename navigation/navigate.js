import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Step1 from '../screens/WelcomeScreens/Step1';
import Step2 from "../screens/WelcomeScreens/Step2";
import Step3 from "../screens/WelcomeScreens/Step3";
import Login from "../screens/Auth/LoginScreen";
import SignUp from '../screens/Auth/SignUp';
import specificInfo from '../screens/Components/info/specificInfo';
import React, { useContext, useEffect, useState } from "react";
import Admin from '../screens/Auth/AdminScreen';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons, MaterialCommunityIcons, Octicons, } from "@expo/vector-icons";
import * as gStyle from '../assets/Styles/globalStyle';
import Cards from '../screens/Components/cards/Cards'
import Chat from '../screens/Components/chat';
import Info from '../screens/Components/info/info';
import Profile from '../screens/Components/profile';
import News from '../screens/Components/news/globalNews';
import { Keyboard } from "react-native";
import { CustomIcon } from "../assets/Styles/Consts";
import CardFormes from '../screens/Components/cards/CardFormes'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Step1" component={Step1} />
                <Stack.Screen name="Step2" component={Step2} />
                <Stack.Screen name="Step3" component={Step3} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Cards" component={TabNavigator} options={{ gestureEnabled: false }} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="Info" component={Info} />
                <Stack.Screen name="News" component={News} />
                <Stack.Screen name="specificInfo" component={specificInfo} />
                <Stack.Screen name="CardFormes" component={CardFormes} />
                <Stack.Screen name="Admin" component={Admin} options={{ gestureEnabled: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function TabNavigator() {
    const [isTabBarVisible, setTabBarVisible] = useState(true);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setTabBarVisible(false);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setTabBarVisible(true);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <Tab.Navigator
            initialRouteName='cards'
            screenOptions={{
                tabBarStyle: { ...gStyle.BottomTabStyle.navigator },
                tabBarShowLabel: false,
                tabBarVisible: isTabBarVisible
            }}>
            <Tab.Screen
                name='News'
                component={News}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <CustomIcon focused={focused} iconName={"newspaper-outline"} FolderName={Ionicons} />
                    ),
                }}
            />
            <Tab.Screen
                name='Info'
                component={Info}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <CustomIcon focused={focused} iconName={'info'} FolderName={Octicons} />
                    ),
                }}
            />
            <Tab.Screen
                name='cards'
                component={Cards}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <CustomIcon focused={focused} iconName={'credit-card'} FolderName={Feather} />
                    ),
                }}
            />
            <Tab.Screen
                name='Chat'
                component={Chat}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <CustomIcon focused={focused} iconName={'message-text-outline'} FolderName={MaterialCommunityIcons} />
                    ),
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <CustomIcon focused={focused} iconName={'person-circle-outline'} FolderName={Ionicons} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}

export default App;
