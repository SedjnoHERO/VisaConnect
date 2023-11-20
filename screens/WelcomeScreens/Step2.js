import React from 'react';
import { View, Text } from 'react-native';
import { Button_continue, Button_skip } from '../../assets/Styles/Consts';
import * as gStyle from '../../assets/Styles/globalStyle';

export default function WelcomeStep2({ navigation }) {
    return (
        <View style={gStyle.gPage.page}>
            <View style={gStyle.Welcomes_location.headlines_location}>
                <Text style={gStyle.Texts.headline_ts}>
                    Благодаря нашему
                    приложению вы сможете
                    с комфортом путешествовать
                    и легко получать визы
                </Text>
            </View>
            <View style={gStyle.Welcomes_location.buttons_location}>
                <View><Button_continue onPress={() => { navigation.navigate('WelcomeStep3') }} /></View>
                <View><Button_skip onPress={() => { navigation.navigate('WelcomeStep3') }} /></View>
            </View>
        </View>
    );
}