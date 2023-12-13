import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Keyboard, KeyboardAvoidingView } from 'react-native';
import { DefInput } from '../../assets/Styles/Consts';
import * as gStyle from '../../assets/Styles/globalStyle';
import { UserContext } from './context';
import { Logout, fetchUsersData } from './usersDB';
import { fetchDataFromDB, createTable, LoadButton } from '../Components/cards/cardsDB';
import { fetchApplicData } from '../Components/cards/applicationsDB';

export default function Admin({ navigation }) {
    const [usersModalVisible, setUsersModalVisible] = useState(false);
    const [visaInfoModalVisible, setVisaInfoModalVisible] = useState(false);
    const [applModalVisible, setApplModalVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [visaInfo, setVisaInfo] = useState([]);
    const [appl, setAppl] = useState([]);

    createTable()

    useEffect(() => {
        fetchUsersData(setUsers);
        fetchDataFromDB(setVisaInfo);
        fetchApplicData(setAppl)
    }, []);

    const openUsersModal = () => {
        setUsersModalVisible(true);
    };

    const openVisaInfoModal = () => {
        setVisaInfoModalVisible(true);
    };

    const closeUsersModal = () => {
        setUsersModalVisible(false);
    };

    const closeVisaInfoModal = () => {
        setVisaInfoModalVisible(false);
    };

    const openApplModal = () => {
        setApplModalVisible(true);
    }
    const closeApplModal = () => {
        setApplModalVisible(false);
    }

    return (
        <View style={{ ...gStyle.gPage.page, justifyContent: 'center', alignItems: 'center', gap: '30%' }}>
            <View style={{ flex: 0.7, width: '90%', alignItems: 'center', gap: '10%' }}>
                <View style={{ flex: 1, backgroundColor: gStyle.Colors.secondary_accent_color, width: '80%', borderRadius: 12, padding: 20, }}>
                    <TouchableOpacity onPress={openUsersModal} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[gStyle.Texts.title, gStyle.TextColors.white]}>Показать информацию о пользователях</Text>
                    </TouchableOpacity>
                </View>
                {openUsersModal}

                <View style={{ flex: 1, backgroundColor: gStyle.Colors.secondary_accent_color, width: '80%', borderRadius: 12, padding: 20, }}>
                    <TouchableOpacity onPress={openApplModal} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[gStyle.Texts.title, gStyle.TextColors.white]}>Просмотреть заявки</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, backgroundColor: gStyle.Colors.secondary_accent_color, width: '80%', borderRadius: 12, padding: 20 }}>
                    <TouchableOpacity onPress={openVisaInfoModal} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[gStyle.Texts.title, gStyle.TextColors.white]}>Создать новую визу</Text>
                    </TouchableOpacity>
                </View>
                {openVisaInfoModal}
            </View>
            <Logout navigation={navigation} />

            <ApplicBase visible={applModalVisible} closeModal={closeApplModal} appl={appl} />
            <VisaBase visible={visaInfoModalVisible} closeModal={closeVisaInfoModal} visaInfo={visaInfo} />
            <UsersBase visible={usersModalVisible} closeModal={closeUsersModal} users={users} />
        </View >
    );
}

const ApplicBase = ({ visible, closeModal, appl }) => {
    const renderAppl = ({ item }) => {
        return (
            <View style={{ borderBottomWidth: 1, padding: 10 }}>
                <Text>ID заявки: {item.application_id}</Text>
                <Text>ID заявителя: {item.user_id}</Text>
                <Text>ID визы: {item.visa_id}</Text>
                <Text>Фамилия: {item.last_name}</Text>
                <Text>Имя: {item.first_name}</Text>
                <Text>Отчество: {item.father_name}</Text>
                <Text>Цена визы: {item.cost}</Text>
                <Text>Тип запрошенной визы: {item.visa_type}</Text>
                <Text>Страна запрошенной визы: {item.visa_country}</Text>
                <Text>Примечание: {item.note}</Text>
            </View>
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={closeModal}
            transparent={true}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', height: '60%' }}>
                    <Text style={{ fontSize: 20, marginBottom: 20 }}>Заявки</Text>
                    <FlatList
                        data={appl}
                        renderItem={renderAppl}
                        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
                    />
                    <TouchableOpacity onPress={closeModal} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
                        <Text>Закрыть</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const VisaBase = ({ visible, closeModal, visaInfo }) => {
    const [secondModalVisible, setSecondModalVisible] = useState(false); // Состояние для второй модальной панели
    const [country, setCountry] = useState('');
    const [type, setType] = useState('');
    const [cost, setCost] = useState('');
    const [buttonState, setButtonState] = useState(false);

    useEffect(() => {
        if (country.length > 0 && type.length > 0 && cost.length > 0) {
            setButtonState(true)
        } else { setButtonState(false) }
    })

    const renderVisaItem = ({ item }) => (
        <View style={{ borderBottomWidth: 1, padding: 10 }}>
            <Text>ID визы: {item.ID}</Text>
            <Text>Страна визы: {item.visaCountry}</Text>
            <Text>Тип визы: {item.visaType}</Text>
            <Text>Стоимость: {item.cost}</Text>
        </View>
    );

    const validateAlphabetAndDash = (value) => {
        return /^[а-яА-Яa-zA-Z-]*$/.test(value);
    };

    const openSecondModal = () => {
        setSecondModalVisible(true);
    };

    const closeSecondModal = () => {
        setSecondModalVisible(false);
    };

    return (
        <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1} >
            <Modal
                visible={visible}
                animationType="slide"
                onRequestClose={closeModal}
                transparent={true}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', height: '60%' }}>
                        <Text style={{ fontSize: 20, marginBottom: 20 }}>Информация о визах</Text>
                        <FlatList
                            data={visaInfo}
                            renderItem={renderVisaItem}
                            keyExtractor={(item) => item.ID.toString()}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={openSecondModal} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
                                <Text>Создать новую визу</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
                                <Text>Закрыть</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {secondModalVisible && (
                    <Modal
                        visible={secondModalVisible}
                        animationType="none"
                        onRequestClose={closeSecondModal}
                        transparent={true}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', height: '40%', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'column', gap: '20%' }}>
                                    <DefInput headline='Введите страну визы' text='Страна' active={true} onChange={(value) => setCountry(value)} validate={validateAlphabetAndDash} />
                                    <DefInput headline='Введите тип визы' text='Тип' active={true} onChange={(value) => setType(value)} validate={validateAlphabetAndDash} />
                                    <DefInput headline='Введите цену визы' text='Цена' active={true} onChange={(value) => setCost(value)} theType='number-pad' />
                                </View>
                                {/*   */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <LoadButton buttonState={buttonState} country={country} type={type} cost={cost} />
                                    <TouchableOpacity onPress={closeSecondModal} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
                                        <Text>Закрыть</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
            </Modal>
        </TouchableOpacity>
    );
};

const UsersBase = ({ visible, closeModal, users }) => {
    const renderUser = ({ item }) => {
        return (
            <View style={{ borderBottomWidth: 1, padding: 10 }}>
                <Text>ID пользователя: {item.id}</Text>
                <Text>Логин: {item.username}</Text>
                <Text>Пароль: *****</Text>
                <Text>Паспорт: {item.passport}</Text>
                <Text>Дата рождения: {item.date}</Text>
                <Text>Фамилия: {item.surname}</Text>
                <Text>Имя: {item.firstName}</Text>
                <Text>Отчество: {item.fatherName}</Text>
                <Text>Путь к документу: {item.documentPath}</Text>
            </View>
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={closeModal}
            transparent={true}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', height: '60%' }}>
                    <Text style={{ fontSize: 20, marginBottom: 20 }}>Информация о пользователях</Text>
                    <FlatList
                        data={users}
                        renderItem={renderUser}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    <TouchableOpacity onPress={closeModal} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
                        <Text>Закрыть</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};