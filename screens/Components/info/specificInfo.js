import React from 'react';
import { Text, SafeAreaView } from 'react-native';

export default function SpecificInfo({ route }) {
    const { visaInfo } = route.params;

    return (
        <SafeAreaView>
            <Text>{visaInfo.title}</Text>
            <Text>{visaInfo.descriptions.description1}</Text>
            <Text>{visaInfo.descriptions.description2}</Text>
            <Text>{visaInfo.descriptions.description3}</Text>
        </SafeAreaView>
    );
};
