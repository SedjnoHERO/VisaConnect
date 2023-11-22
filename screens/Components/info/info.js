import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet } from 'react-native';
import visaData from './infoAboutVisas.json';
import * as gStyle from '../../../assets/Styles/globalStyle';

export default function Info({ navigation }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(visaData);
    }, []);

    const renderColumnItems = (columnData) => {
        return columnData.map((item, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('specificInfo', { visaInfo: item })}
                style={gStyle.InfoCellsStyle.cells}
            >
                //добавить иконку зависяющую от путя в infoAboutVisas
                <Text style={gStyle.InfoCellsStyle.headline}>{item.title}</Text>
                <Text style={gStyle.Texts.article_ts}>{item.descriptions.description1}</Text>
            </TouchableOpacity>
        ));
    };

    const column1 = data.slice(0, 3);
    const column2 = data.slice(3, 6);

    return (
        <SafeAreaView style={gStyle.gPage.page}>
            <Text style={gStyle.gPage.title}>Информация о визах</Text>
            <View style={gStyle.InfoCellsStyle.grid}>
                <View>
                    {renderColumnItems(column1)}
                </View>
                <View>
                    {renderColumnItems(column2)}
                </View>
            </View>
        </SafeAreaView>
    );
};