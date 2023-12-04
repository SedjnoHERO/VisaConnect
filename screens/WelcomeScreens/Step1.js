import React, { useContext, useEffect } from 'react';
import { View, Text, } from 'react-native';
import { Button_continue, Button_skip } from '../../assets/Styles/Consts';
import * as gStyle from '../../assets/Styles/globalStyle';
import { UserContext } from '../Auth/context';

export default function Step1({ navigation }) {
    const { storedLogin } = useContext(UserContext);
    const { isAdmin } = useContext(UserContext)

    useEffect(() => {
        if (isAdmin) {
            console.log(isAdmin);
            navigation.navigate('Admin');
        } else if (storedLogin.username) {
            navigation.navigate('Cards');
            console.log(isAdmin);
        } else { }
    }, [isAdmin, storedLogin]);

    return (
        <View style={gStyle.gPage.page}>
            <View style={gStyle.Welcomes_location.headlines_location}>
                <Text style={gStyle.Texts.headline_ts}>
                    Добро пожаловать
                    в VisaConnect
                </Text>
            </View>
            <View style={gStyle.Welcomes_location.buttons_location}>
                <View><Button_continue onPress={() => { navigation.navigate('Step2') }} /></View>
                <View><Button_skip onPress={() => { navigation.navigate('Step3') }} /></View>
            </View>
        </View>
    );
}