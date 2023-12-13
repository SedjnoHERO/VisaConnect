import React from "react";
import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";
import * as gStyle from '../../../assets/Styles/globalStyle';
import { PlusSquare } from 'phosphor-react-native';
import { createTable } from './cardsDB';
import { useUserContext } from '../../Auth/context';
import { InformationAbout } from "../../Auth/usersDB";

export default function Cards({ navigation }) {

    const createVisa = () => {

        return (
            <View>

            </View>
        );
    }


    createTable();
    const { storedLogin } = useUserContext();

    return (
        <SafeAreaView style={{ ...gStyle.gPage.page, alignItems: 'center' }}>
            <Text style={gStyle.gPage.headline}>Ваши визы</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('CardFormes') }} >
                <PlusSquare size={200} color={gStyle.TextColors.black} weight='thin' />
            </TouchableOpacity>
            <InformationAbout actionType='display' />
        </SafeAreaView>
    );
}
