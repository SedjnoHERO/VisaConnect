import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import * as gStyle from '../../../assets/Styles/globalStyle';
import { Feather, Ionicons, MaterialCommunityIcons, Octicons, } from "@expo/vector-icons";

export default function SpecificInfo({ route }) {
    const { visaInfo } = route.params;

    return (
        <SafeAreaView style={gStyle.gPage.page}>
            <View style={{ flexdirection: row }}>
                //добавить иконку назад
                <Text style={gStyle.gPage.title}>Вернуться к списку виз</Text>
            </View>
            <Text style={gStyle.Texts.normal_ts}>{visaInfo.title}</Text>
            <Text style={gStyle.Texts.button_skip_ts}>{visaInfo.descriptions.description1}</Text>
            <Text style={gStyle.Texts.button_skip_ts}>{visaInfo.descriptions.description2}</Text>
            <Text style={gStyle.Texts.button_skip_ts}>{visaInfo.descriptions.description3}</Text>
        </SafeAreaView>
    );
};
