import React, { useEffect, useState } from 'react';
import { Keyboard, Text, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native';
import * as gStyle from '../../assets/Styles/globalStyle';
import { Inputs, Button_continue } from '../../assets/Styles/Consts';
import { initializeDatabase, loginUser, InformationAbout } from './usersDB';
import { useUserContext } from './context';

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { storedLogin, setStoredLogin } = useUserContext();

    useEffect(() => {
        initializeDatabase();
    }, []);

    const handleEmailChange = text => {
        setEmail(text);
    };

    const handlePasswordChange = text => {
        setPassword(text);
    };

    const handleLogin = async () => {
        try {
            const loginResult = await loginUser(email, password, setStoredLogin);
            console.log(loginResult);
            if (loginResult.isAdmin) {
                navigation.navigate('Admin');
            } else {
                navigation.navigate('Cards');
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
                            Авторизация
                        </Text>
                    </View>
                    <View style={gStyle.userLog.inputs_log}>
                        <View style={{ marginLeft: 0, }}>
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
                            // secure={true}
                            />
                        </View>
                        <Button_continue onPress={handleLogin} title='Авторизоваться' />
                        <View style={{ flexDirection: 'column', alignItems: 'center', top: 15 }}>
                            <Text style={gStyle.Texts.button_skip_ts}>Впервые пользуетесь?</Text>
                            <TouchableOpacity style={{ top: 10 }} onPress={() => navigation.navigate('SignUp')}>
                                <Text style={gStyle.Texts.normal_ts}>Зарегистрироваться</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <InformationAbout actionType='display' />
                </>
            </TouchableOpacity>
        </KeyboardAvoidingView >
    );
}