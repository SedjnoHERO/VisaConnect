import React from 'react';
import { Text, View } from 'react-native';
import * as gStyle from '../../../assets/Styles/globalStyle';
import { ScrollView } from 'react-native';
import { Title } from '../../../assets/Styles/Consts';

export default function SpecificInfo({ route }) {
    const { visaInfo } = route.params;

    return (
        <View style={gStyle.gPage.page}>
            <Title text={'Вернуться к визам'} />
            <ScrollView>
                <View style={{ marginHorizontal: 10, marginTop: 10, marginBottom: '10%' }}>

                    <Text style={{ ...gStyle.Texts.normal_ts, marginBottom: 20 }}>{visaInfo.desc.desc2}</Text>
                    <Text style={gStyle.Texts.button_skip_ts}>{visaInfo.desc.desc3}</Text>
                    <Text style={gStyle.Texts.button_skip_ts}>{visaInfo.desc.desc4}</Text>
                    <Text style={gStyle.Texts.button_skip_ts}>{visaInfo.desc.desc5}</Text>
                    <Text style={gStyle.Texts.button_skip_ts}>{visaInfo.desc.desc6}</Text>
                    <Text style={gStyle.Texts.button_skip_ts}>{visaInfo.desc.desc7}</Text>
                    <Text style={gStyle.Texts.button_skip_ts}>{visaInfo.desc.desc8}</Text>
                    <Text style={gStyle.Texts.button_skip_ts}>{visaInfo.desc.desc9}</Text>
                </View>

            </ScrollView >
        </View >
    );
};

