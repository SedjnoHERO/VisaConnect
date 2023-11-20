import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native';
import * as gStyle from '../../assets/Styles/globalStyle';
import { Inputs, Button_continue } from '../../assets/Styles/Consts';
import * as SQlite from 'expo-sqlite';

const db = SQlite.openDatabase('users.db');

db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)'
    );
});

const registerUser = (username, password) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, password],
            (_, results) => {
                if (results.rowsAffected > 0) {
                    console.log('Пользователь успешно загреистрирован');
                } else {
                    console.log('Ошибка при регистрации пользователя');
                }
            }
        );
    });
};

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailChange = text => {
        setEmail(text);
    };

    const handlePasswordChange = text => {
        setPassword(text);
    };

    const handleConfirmPasswordChange = text => {
        setConfirmPassword(text);
    };

    const handleSignUp = () => {
        if ((password === confirmPassword) && (length(password) != 0)) {
            registerUser(email, password);
        } else {
            console.log('Пароли не совпадают');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={gStyle.gPage.page}>
            <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1} style={{ flex: 1 }}>
                <>
                    <View style={gStyle.Welcomes_location.headlines_location}>
                        <Text style={gStyle.Texts.headline_ts}>
                            Регистрация
                        </Text>
                    </View>
                    <View style={gStyle.userLog.Inputs}>
                        <View>
                            <Text style={gStyle.Inputs.textBefore}>Введите вашу почту</Text>
                            <Inputs
                                TextPlaceHolder={'Почта'}
                                ChangeText={handleEmailChange}
                                valueInfo={email}
                            />
                        </View>
                        <View>
                            <Text style={gStyle.Inputs.textBefore}>Введите пароль</Text>
                            <Inputs
                                TextPlaceHolder={'Пароль'}
                                ChangeText={handlePasswordChange}
                                valueInfo={password}
                            />
                        </View>
                        <View>
                            <Text style={gStyle.Inputs.textBefore}>Введите пароль повторно</Text>
                            <Inputs
                                TextPlaceHolder={'Пароль'}
                                ChangeText={handleConfirmPasswordChange}
                                valueInfo={confirmPassword}
                            />
                        </View>
                        <Button_continue onPress={handleSignUp} title='Зарегистрироваться' />
                    </View>
                </>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}