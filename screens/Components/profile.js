import react from "react";
import { Text, View } from "react-native";
import { Logout } from '../Auth/usersDB';
import * as gStyle from '../../assets/Styles/globalStyle';

export default function Profile({ navigation }) {
    return (
        <View style={gStyle.gPage.page}>
            <Logout />
        </View>
    );
}