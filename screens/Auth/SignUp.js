import React, { useEffect, useState } from 'react';
import { Keyboard, Text, KeyboardAvoidingView, View, TouchableOpacity, ScrollView } from 'react-native';
import * as gStyle from '../../assets/Styles/globalStyle';
import { Inputs, Button_continue } from '../../assets/Styles/Consts';
import { initializeDatabase, registerUser, InformationAbout, checkExistingEmail } from './DataBase';


export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegisterEnabled, setIsRegisterEnabled] = useState(false);

    useEffect(() => {
        initializeDatabase();
    }, []);

    useEffect(() => {
        const validateFields = () => {
            setIsRegisterEnabled(
                password === confirmPassword &&
                password.length !== 0 &&
                email.length !== 0
            );
        };

        validateFields();
    }, [email, password, confirmPassword]);

    const handleEmailChange = async text => {
        setEmail(text);
        try {
            const emailExists = await checkExistingEmail(text);
            setIsRegisterEnabled(
                password === confirmPassword &&
                password.length !== 0 &&
                text.length !== 0 &&
                !emailExists
            );
        } catch (error) {
            console.log(error);
        }
    };


    const handlePasswordChange = text => {
        setPassword(text);
    };

    const handleConfirmPasswordChange = text => {
        setConfirmPassword(text);
    };

    const handleSignUp = async () => {
        try {
            if ((password === confirmPassword) && (password.length !== 0) && (email.length !== 0)) {
                const emailExists = await checkExistingEmail(email);

                if (emailExists) {
                    console.log('Пользователь с такой почтой уже существует');
                } else {
                    await registerUser(email, password);
                    navigation.navigate('Cards');
                }
            } else {
                console.log('Ошибка при регистрации пользователя');
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={[gStyle.gPage.page, { flex: 1 }]}>
            <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1} style={{ flex: 1 }}>
                <>
                    <View style={gStyle.Welcomes_location.headlines_location}>
                        <Text style={gStyle.Texts.headline_ts}>
                            Регистрация
                        </Text>
                    </View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                        <View style={gStyle.userLog.inputs_reg}>
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
                                    secure={true}
                                />
                            </View>
                            <View>
                                <Text style={gStyle.Inputs.textBefore}>Введите пароль повторно</Text>
                                <Inputs
                                    TextPlaceHolder={'Пароль'}
                                    ChangeText={handleConfirmPasswordChange}
                                    valueInfo={confirmPassword}
                                    secure={true}
                                />
                            </View>
                            <Button_continue
                                ButtonStyle={{}}
                                disabled={!isRegisterEnabled}
                                onPress={handleSignUp}
                                title='Зарегистрироваться'
                            />
                            <View style={{ flexDirection: 'column', alignItems: 'center', top: 15 }}>
                                <Text style={gStyle.Texts.button_skip_ts}>Уже зарегистрированы?</Text>
                                <TouchableOpacity style={{ top: 10 }} onPress={() => navigation.navigate('Login')}><Text style={gStyle.Texts.normal_ts}>Войти</Text></TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    <InformationAbout />
                </>
            </TouchableOpacity>
        </KeyboardAvoidingView >
    );
}