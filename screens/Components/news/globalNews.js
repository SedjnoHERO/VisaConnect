import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import * as gStyle from '../../../assets/Styles/globalStyle';
import { Title } from '../../../assets/Styles/Consts';

export default function News({ navigation, isAdmin }) {
    const [news, setNews] = useState([]);

    // Метод для получения новостей, здесь можно использовать API запросы
    const fetchNews = async () => {
        // Здесь должна быть логика получения новостей, например, из базы данных или API
        // Замените этот блок кода на логику вашего приложения
        const fetchedNews = await yourFetchFunctionToGetNews(); // Замените на ваш метод получения новостей
        setNews(fetchedNews);
    };

    useEffect(() => {
        fetchNews(); // Получаем новости при загрузке экрана
    }, []);

    const renderNewsItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleNewsPress(item)}>
                <View>
                    <Text>{item.title}</Text>
                    <Text>{item.content}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const handleNewsPress = (selectedNews) => {
        // Здесь можно добавить логику для действий при нажатии на новость
        // Например, открыть подробную страницу новости или что-то еще
        console.log('Выбрана новость:', selectedNews);
    };

    return (
        <SafeAreaView style={gStyle.gPage.page}>
            <Text style={gStyle.gPage.headline}>Новости</Text>
            <FlatList
                data={news}
                renderItem={renderNewsItem}
                keyExtractor={(item) => item.id.toString()}
            />
            {isAdmin && (
                <TouchableOpacity onPress={{}}>/* Метод для создания новости */
                    <Text>Создать новость</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

