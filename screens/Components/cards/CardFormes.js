import { View, TouchableOpacity, Keyboard, KeyboardAvoidingView, ScrollView } from "react-native";
import * as gStyle from '../../../assets/Styles/globalStyle';
import { InputLimited, Title, DropInput, DefInput } from "../../../assets/Styles/Consts"
import { useContext, useEffect, useState } from "react";
import { FetchButton, ShowAllApplic } from "./applicationsDB";
import { useUserContext } from '../../Auth/context';
import { getAdditionalInfo } from "./cardsDB";
import { createApplicationsTable } from "./applicationsDB";

export default function CardFormes({ navigation }) {
    const [firstSideState, setFirstSideState] = useState(false);
    const [fetchAccess, setFetchAccess] = useState(false);
    const { storedLogin } = useUserContext();

    const [visaType, setVisaType] = useState('');
    const [visaCountry, setVisaCountry] = useState('');
    const [note, setNote] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [visaData, setVisaData] = useState([]);

    useEffect(() => {
        createApplicationsTable();

        if (visaType.length > 6 && visaCountry.length > 4) {
            setFirstSideState(true);
        } else {
            setFirstSideState(false);
        }
    }, [visaType, visaCountry]);

    const handleNextPartUnlock = (text, inputType) => {
        if (inputType === 'visaType') {
            setVisaType(text);
        } else if (inputType === 'visaCountry') {
            setVisaCountry(text);
        }
    };

    useEffect(() => {
        if (visaType.length > 0 && visaCountry.length > 0 && note.length > 0 && firstName.length > 0 && lastName.length > 0 && fatherName.length > 0) {
            setFetchAccess(true);
            getAdditionalInfo({ visaType, visaCountry }, (fetchedData) => {
                setVisaData(fetchedData);
            });
        } else {
            setFetchAccess(false);
        }
    }, [visaType, visaCountry, note, firstName, lastName, fatherName]);

    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={[gStyle.gPage.page, { flex: 1 }]}>
            <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1} style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ ...gStyle.gPage.page, alignItems: 'center', gap: '20%' }}>
                        <Title text='Заполните информацию' />
                        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', width: '75%', gap: '20%', marginTop: '3%', }}>
                            <View style={{ flexDirection: 'column', flex: 1, rowGap: '20%', paddingHorizontal: '3%' }}>
                                <DropInput headline='Выберите тип визы' dropType='visaType' onChange={(value) => handleNextPartUnlock(value, 'visaType')} />
                                <DropInput headline='Выберите страну для визы' dropType='visaCountry' onChange={(value) => handleNextPartUnlock(value, 'visaCountry')} />
                                <InputLimited length={100} headline='Опишите цель поездки' onChange={(value) => setNote(value)} />
                            </View>
                            <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, width: '100%' }}></View>
                            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', gap: '20%', paddingHorizontal: '3%', }}>
                                <DefInput headline='Введите фамилию заявителя' text='Фамилия' active={firstSideState} onChange={(value) => setLastName(value)} />
                                <DefInput headline='Введите имя заявителя' text='Имя' active={firstSideState} onChange={(value) => setFirstName(value)} />
                                <DefInput headline='Введите отчество заявителя' text='Отчество' active={firstSideState} onChange={(value) => setFatherName(value)} />
                            </View>
                        </View>
                        <FetchButton
                            active={fetchAccess}
                            userId={storedLogin.id}
                            visaId={visaData.map((item) => item.ID).join(', ')}
                            cost={visaData.map((item) => item.cost).join(', ')}
                            visaType={visaType}
                            visaCountry={visaCountry}
                            note={note}
                            firstName={firstName}
                            lastName={lastName}
                            fatherName={fatherName}
                        />
                        <ShowAllApplic />
                    </View >
                </ScrollView>
            </TouchableOpacity>
        </KeyboardAvoidingView >
    );
}