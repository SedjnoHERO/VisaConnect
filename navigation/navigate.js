import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeStep1 from '../screens/WelcomeScreens/WelcomeStep1';
import WelcomeStep2 from "../screens/WelcomeScreens/WelcomeStep2";
import WelcomeStep3 from "../screens/WelcomeScreens/WelcomeStep3";
import Login from "../screens/Auth/LoginScreen";
import React from "react";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="WelcomeStep1" component={WelcomeStep1} options={{ headerShown: false }} />
                <Stack.Screen name="WelcomeStep2" component={WelcomeStep2} options={{ headerShown: false }} />
                <Stack.Screen name="WelcomeStep3" component={WelcomeStep3} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
