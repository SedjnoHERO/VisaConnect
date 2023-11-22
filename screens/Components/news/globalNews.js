import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import * as gStyle from '../../../assets/Styles/globalStyle';

export default function News({ navigation }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(visaData);
    }, []);

    const renderColumnItems = (columnData) => {
        return columnData.map((item, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('specificInfo', { visaInfo: item })}
                style={gStyle.Info.cells}
                underlayColor={gStyle.Colors.secondary_accent_color}
            >
                <Svg height={39} width={39}>
                    <Path d={item.icon} fill={gStyle.TextColors.black} />
                </Svg>
                <Text style={gStyle.Info.headline}>{item.title}</Text>
                <Text style={gStyle.Texts.article_ts}>{item.desc.desc1}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <SafeAreaView style={gStyle.gPage.page}>
            <Text style={gStyle.gPage.title}>Информация о визах</Text>
            <View style={gStyle.Info.grid}>
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