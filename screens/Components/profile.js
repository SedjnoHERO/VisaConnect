import react, { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Logout } from '../Auth/usersDB';
import * as gStyle from '../../assets/Styles/globalStyle';
import { DefInput } from "../../assets/Styles/Consts";

export default function Profile({ navigation }) {
    const [lastName, setLastName] = useState('')
    const [name, setName] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [passport, setPassport] = useState('')
    const [date, setDate] = useState('')

    const validateAlphabetAndDash = (value) => {
        return /^[а-яА-Яa-zA-Z-]*$/.test(value);
    };

    // Функция проверки ввода только цифр и букв (русских и латинских)
    const validateAlphanumeric = (value) => {
        return /^[а-яА-Яa-zA-Z0-9]*$/.test(value);
    };

    return (
        <SafeAreaView style={{ ...gStyle.gPage.page, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', gap: '20%' }}>
            <Text style={gStyle.gPage.headline}>Профиль</Text>
            <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false}>
                <View style={{ ...gStyle.gPage.page, alignItems: 'center', gap: '20%', marginBottom: '20%' }}>
                    <View style={{ backgroundColor: gStyle.TextColors.enabled, aspectRatio: 1, width: '60%', borderRadius: 360, justifyContent: 'center', alignItems: 'center' }}><Text>Недостпуно</Text></View>
                    <DefInput headline='Введите фамилию заявителя' text='Фамилия' onChange={(value) => setLastName(value)} validate={validateAlphabetAndDash} />
                    <DefInput headline='Введите имя заявителя' text='Имя' onChange={(value) => setName(value)} validate={validateAlphabetAndDash} />
                    <DefInput headline='Введите отчество заявителя' text='Отчество' onChange={(value) => setFatherName(value)} validate={validateAlphabetAndDash} />
                    <DefInput headline='Введите номер паспорта заявителя' text='Номер паспорта' onChange={(value) => setPassport(value)} validate={validateAlphanumeric} />
                    <DefInput headline='Введите дату рождения заявителя' text='Дата рождения' onChange={(value) => setDate(value)} theType='number-pad' />
                    <Logout navigation={navigation} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}