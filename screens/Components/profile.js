import react from "react";
import { Text, View } from "react-native";
import { Button_continue } from "../../assets/Styles/Consts";

export default function Profile({ navigation }) {
    return (
        <View style={{ left: 20, top: 200 }}>
            <Text>Здравствуйте</Text>
            <View><Button_continue onPress={() => { navigation.navigate('SignUp') }} /></View>
        </View>
    );
}