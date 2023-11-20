import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Button_continue } from '../../assets/Styles/Consts';
import * as gStyle from '../../assets/Styles/globalStyle';

export default function WelcomeStep3({ navigation }) {
    return (
        <SafeAreaView style={gStyle.gPage.page}>
            <View style={gStyle.Welcomes_location.headlines_location}>
                <Text style={gStyle.Texts.headline_ts}>
                    Станьте частью нашего
                    приложения
                </Text>
            </View>
            <View style={gStyle.Welcomes_location.buttons_location}>
                <View><Button_continue onPress={() => { navigation.navigate('Login') }} title='Авторизоваться' /></View>
                <View><Button_continue onPress={() => { navigation.navigate('SignUp') }} title='Зарегистрироваться' /></View>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#242424', width: 390, marginBottom: 10, marginTop: 65 }} />
                <View style={[gStyle.TextColors.black, { marginBottom: 20 }]}><Text>или посетите наше приложение как гость</Text></View>
                <View><Button_continue onPress={() => { navigation.navigate('Cards') }} ButtonStyle={{ backgroundColor: gStyle.Colors.secondary_accent_color }} /></View>
            </View>

        </SafeAreaView >
    );
}