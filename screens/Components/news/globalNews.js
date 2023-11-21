import react from "react";
import { Text, View } from "react-native";
import { Button_continue } from "../../../assets/Styles/Consts";
import { StatusBar } from "expo-status-bar";

export default function News({ navigation }) {
    return (
        <View style={{ left: 20, top: 200 }}>
            <Text>Hello</Text>
            <View><Button_continue onPress={() => { navigation.navigate('SignUp') }} /></View>
            <StatusBar />
        </View>
    );
}