import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Button_continue, Button_skip } from '../../assets/Styles/Consts';
import * as gStyle from '../../assets/Styles/globalStyle';
import { UserContext } from './context';
import { Logout, fetchUsersData } from './usersDB';



export default function Admin({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsersData(setUsers);
    }, []);


    const openModal = () => {
        fetchUsersData();
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };


    return (
        <View style={{ ...gStyle.gPage.page, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 0.7, width: '90%', alignItems: 'center', gap: '10%' }}>
                <View style={{ flex: 1, backgroundColor: gStyle.Colors.secondary_accent_color, width: '80%', borderRadius: 12, padding: 20, }}>
                    <TouchableOpacity onPress={openModal} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[gStyle.Texts.title, gStyle.TextColors.white]}>Показать информацию о пользователях</Text>
                    </TouchableOpacity>
                </View>
                {modalVisible}
                <View style={{ flex: 1, backgroundColor: gStyle.Colors.secondary_accent_color, width: '80%', borderRadius: 12, padding: 20, }}>
                    <TouchableOpacity onPress={openModal} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[gStyle.Texts.title, gStyle.TextColors.white]}>Просмотреть заявки</Text>
                    </TouchableOpacity>
                </View>
                {modalVisible}
                <View style={{ flex: 1, backgroundColor: gStyle.Colors.secondary_accent_color, width: '80%', borderRadius: 12, padding: 20, }}>
                    <TouchableOpacity onPress={openModal} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[gStyle.Texts.title, gStyle.TextColors.white]}>Создать новую визу</Text>
                    </TouchableOpacity>
                </View>
                {modalVisible}
                <Logout navigation={navigation} />
            </View>

            <ModalComponent visible={modalVisible} closeModal={closeModal} users={users} fetchUsersData={fetchUsersData} />
        </View >
    );
}

const ModalComponent = ({ visible, closeModal, users }) => {
    const renderUser = ({ item }) => {
        return (
            <View style={{ borderBottomWidth: 1, padding: 10 }}>
                <Text>ID: {item.id}</Text>
                <Text>Username: {item.username}</Text>
                <Text>Password: *****</Text>
                <Text>Passport: {item.passport}</Text>
                <Text>Date: {item.date}</Text>
                <Text>First Name: {item.firstName}</Text>
                <Text>Surname: {item.surname}</Text>
                <Text>Father Name: {item.fatherName}</Text>
                <Text>Document Path: {item.documentPath}</Text>
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
