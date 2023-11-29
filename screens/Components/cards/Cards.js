import React from "react";
import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";
import * as gStyle from '../../../assets/Styles/globalStyle';
import { PlusSquare } from 'phosphor-react-native';
import { createTable, loadFromJsonToDB } from './cardsDB';
import { useUser } from '../../Auth/context';

export default function Cards({ navigation }) {
    // Вызываем функции для создания таблицы и загрузки данных
    createTable();
    loadFromJsonToDB();
    const { loggedInUser } = useUser();
    return (
        <SafeAreaView style={{ ...gStyle.gPage.page, alignItems: 'center' }}>
            <View>
                {loggedInUser ? (
                    <Text>Привет, {loggedInUser}!</Text>
                ) : (
                    <Text>Пожалуйста, войдите в систему.</Text>
                )}
            </View>
            <Text style={gStyle.gPage.headline}>Новости</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('CardFormes') }} >
                <PlusSquare size={200} color={gStyle.TextColors.black} weight='thin' />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
