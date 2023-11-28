import { View, TouchableOpacity, Keyboard, KeyboardAvoidingView, ScrollView } from "react-native";
import * as gStyle from '../../../assets/Styles/globalStyle';
import { InputLimited, Title, DropInput, DefInput } from "../../../assets/Styles/Consts"
import { useState } from "react";

export default function CardFormes({ navigation }) {
    const [firstSideState, setFirstSideState] = useState(false);
    // handleInputChange = (value) => {
    //     if (value.length != 0) { setFirstSideState(true) } else { setFirstSideState(false) }
    // }
    handleInputChange = (value) => {
        const isAnyInputNotEmpty = value.some(item => item.length !== 0);
        setFirstSideState(isAnyInputNotEmpty);
    }

    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={[gStyle.gPage.page, { flex: 1 }]}>
            <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1} style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ ...gStyle.gPage.page, alignItems: 'center' }}>
                        <Title text='Заполните информацию' />
                        {/* main */}
                        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', width: '75%', gap: '20%', marginTop: '3%', }}>
                            {/* firstSide */}
                            <View style={{ flexDirection: 'column', flex: 1, rowGap: '20%', paddingHorizontal: '3%' }}>
                                <DropInput headline='Выберите тип визы' dropType='visaType' onChange={(value) => handleInputChange([value])} />
                                <DropInput headline='Выберите страну для визы' dropType='visaCountry' onChange={(value) => handleInputChange([value])} />

                                {/* <DropInput headline='Выберите тип визы' dropType='visaType' onChange={handleInputChange} />
                                <DropInput headline='Выберите страну для визы' dropType='visaCountry' onChange={handleInputChange} /> */}
                                <InputLimited length={100} headline='Опишите цель поездки' />
                            </View>
                            {/* line */}
                            <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, width: '100%' }}></View>
                            {/* secondSide */}
                            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', gap: '20%', paddingHorizontal: '3%', }}>
                                {/* username */}
                                <DefInput headline='Введите имя заявителя' text='Имя' active={firstSideState} />
                                {/* userSurname */}
                                <DefInput headline='Введите фамилию заявителя' text='Фамилия' active={firstSideState} />
                                {/* userFatherName */}
                                <DefInput headline='Введите отчество заявителя' text='Отчество' active={firstSideState} />
                            </View>
                        </View>
                    </View >
                </ScrollView>
            </TouchableOpacity>
        </KeyboardAvoidingView >
    );
}