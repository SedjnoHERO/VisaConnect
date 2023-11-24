import { View, Text, TouchableOpacity, Keyboard, KeyboardAvoidingView, ScrollView } from "react-native";
import * as gStyle from '../../../assets/Styles/globalStyle';
import { Title } from "../../../assets/Styles/Consts";
import { CaretUpDown } from 'phosphor-react-native';
import { Dropbox } from "../../../assets/Styles/Consts";


export default function CardFormes({ navigation }) {
    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={[gStyle.gPage.page, { flex: 1 }]}>
            <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1} style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ ...gStyle.gPage.page, alignItems: 'center' }}>
                        < Title text={'Заполните информацию'} />
                        {/* main */}
                        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', width: '75%', gap: '20%', marginTop: '3%', }}>
                            {/* firstSide */}
                            <View style={{ flexDirection: 'column', flex: 1, rowGap: '20%', paddingHorizontal: '3%' }}>
                                {/* visaType */}
                                <Dropbox headline={'Выберите тип визы'} text={'Выбрать'} />
                                {/* visaCountry */}
                                <View style={{ flexDirection: 'column', gap: 10 }}>
                                    <Text style={[gStyle.TextColors.black, { paddingHorizontal: '5%', fontFamily: 'reg', fontSize: 16 }]}>Выберите страну для визы</Text>
                                    <View style={{ borderRadius: 12, borderColor: '#d3d3d3', borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', height: 45, alignItems: 'center' }}>
                                        <Text style={{ color: '#d3d3d3', fontFamily: 'reg', fontSize: 16 }}>Выбрать</Text>
                                        <CaretUpDown size={24} color="#d3d3d3" />
                                    </View>
                                </View>
                                {/* visaNote */}
                                <View style={{ flexDirection: 'column', gap: 10 }}>
                                    <Text style={[gStyle.TextColors.black, { paddingHorizontal: '5%', fontFamily: 'reg', fontSize: 16 }]}>Опишите цель поездки</Text>
                                    <View style={{ borderRadius: 12, borderColor: '#d3d3d3', borderWidth: 1, flexDirection: 'column', paddingLeft: '5%', paddingTop: 5, height: 65, alignItems: 'center' }}>
                                        <View style={{ paddingVertical: 10, paddingRight: '5%', width: '100%' }}>
                                            <Text style={{ color: '#d3d3d3', fontFamily: 'reg', fontSize: 16, width: '100%' }}>Текст</Text>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'row-reverse', gap: 10 }}>
                                            <View style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 8, paddingBottom: 5, alignItems: 'center', alignSelf: 'stretch', }}>
                                                <View style={{ width: 9, height: 9, borderBottomLeftRadius: 0, borderBottomRightRadius: 8, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderColor: 'rgba(211, 211, 211, 1)', borderRightWidth: 1, borderBottomColor: 'rgba(211, 211, 211, 1)', borderBottomWidth: 1, }} />
                                            </View>
                                            <Text style={{ fontFamily: 'reg', fontSize: 12, color: '#d3d3d3' }}>0/50</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* line */}
                            <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, width: '100%' }}></View>
                            {/* secondSide */}
                            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', gap: '20%', paddingHorizontal: '3%', }}>
                                {/* username */}
                                <View style={{ flexDirection: 'column', gap: 10 }}>
                                    <Text style={[{ paddingHorizontal: '5%', fontFamily: 'reg', fontSize: 16, color: '#d3d3d3' }]}>Введите имя заявителя</Text>
                                    <View style={{ borderRadius: 12, borderColor: '#d3d3d3', borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', height: 45, alignItems: 'center' }}>
                                        <Text style={{ color: '#d3d3d3', fontFamily: 'reg', fontSize: 16 }}>Имя</Text>
                                    </View>
                                </View>
                                {/* userSurname */}
                                <View style={{ flexDirection: 'column', gap: 10 }}>
                                    <Text style={[{ paddingHorizontal: '5%', color: '#d3d3d3', fontFamily: 'reg', fontSize: 16 }]}>Введите фамилию заявителя</Text>
                                    <View style={{ borderRadius: 12, borderColor: '#d3d3d3', borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', height: 45, alignItems: 'center' }}>
                                        <Text style={{ color: '#d3d3d3', fontFamily: 'reg', fontSize: 16 }}>Фамилия</Text>
                                    </View>
                                </View>
                                {/* userFatherName */}
                                <View style={{ flexDirection: 'column', gap: 10 }}>
                                    <Text style={[{ paddingHorizontal: '5%', fontFamily: 'reg', fontSize: 16, color: '#d3d3d3' }]}>Введите отчество заявителя</Text>
                                    <View style={{ borderRadius: 12, borderColor: '#d3d3d3', borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', height: 45, alignItems: 'center' }}>
                                        <Text style={{ color: '#d3d3d3', fontFamily: 'reg', fontSize: 16 }}>Отчество</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View >
                </ScrollView>
            </TouchableOpacity>
        </KeyboardAvoidingView >


    );
}