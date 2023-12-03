import react, { useState } from "react";
import { Text, View } from "react-native";
import { Logout } from '../Auth/usersDB';
import * as gStyle from '../../assets/Styles/globalStyle';

export default function Profile({ navigation }) {

    return (
        <View style={{ ...gStyle.gPage.page, justifyContent: 'center', alignItems: 'center' }}>
            <Logout navigation={navigation} />
        </View>
    );
}