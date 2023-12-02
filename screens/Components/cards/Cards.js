import React from "react";
import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";
import * as gStyle from '../../../assets/Styles/globalStyle';
import { PlusSquare } from 'phosphor-react-native';
import { createTable, loadFromJsonToDB } from './cardsDB';

export default function Cards({ navigation }) {
    // Вызываем функции для создания таблицы и загрузки данных
    createTable();
    loadFromJsonToDB();
    return (
        <SafeAreaView style={{ ...gStyle.gPage.page, alignItems: 'center' }}>
            <Text style={gStyle.gPage.headline}>Новости</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('CardFormes') }} >
                <PlusSquare size={200} color={gStyle.TextColors.black} weight='thin' />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
