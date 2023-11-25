import { View, Text, TouchableOpacity, Keyboard, KeyboardAvoidingView, ScrollView } from "react-native";
import * as gStyle from '../../../assets/Styles/globalStyle';
import { InputLimited, Title, DropInput, DefInput } from "../../../assets/Styles/Consts"

export default function CardFormes({ navigation }) {
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
                                {/* visaType */}
                                <DropInput headline='Выберите тип визы' />
                                {/* visaCountry */}
                                <DropInput headline='Выберите страну для визы' />
                                {/* visaNote */}
                                <InputLimited length={100} headline='Опишите цель поездки' />
                            </View>
                            {/* line */}
                            <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, width: '100%' }}></View>
                            {/* secondSide */}
                            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', gap: '20%', paddingHorizontal: '3%', }}>
                                {/* username */}
                                <DefInput headline='Введите имя заявителя' text='Имя' />
                                {/* userSurname */}
                                <DefInput headline='Введите фамилию заявителя' text='Фамилия' />
                                {/* userFatherName */}
                                <DefInput headline='Введите отчество заявителя' text='Отчество' />
                            </View>
                        </View>

                    </View >
                </ScrollView>
            </TouchableOpacity>
        </KeyboardAvoidingView >


    );
}