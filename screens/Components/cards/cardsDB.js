import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import startCards from './startCards.json';
import { TouchableOpacity, View, Text } from 'react-native';
import * as gStyle from "../../../assets/Styles/globalStyle";

const db = SQLite.openDatabase('visa.db');

// Создаем таблицу в базе данных, если она не существует
export const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS VisaInfo (ID INTEGER PRIMARY KEY AUTOINCREMENT, visaCountry TEXT, visaType TEXT, cost REAL);'
        );
    });
};

// Загружаем данные из JSON файла в базу данных
export const loadFromJsonToDB = async () => {
    try {
        const data = startCards;
        db.transaction((tx) => {
            data.forEach((item) => {
                tx.executeSql(
                    'INSERT INTO VisaInfo (id, visaCountry, visaType, cost) VALUES (?, ?, ?, ?);',
                    [item.id, item.visaCountry, item.visaType, item.cost]
                );
            });
        });
    } catch (error) {
        console.log('Ошибка перехода из JSON в БД:', error);
    }
};

//показать всё из visa.db
export const fetchDataFromDB = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM VisaInfo;', [], (_, { rows }) => {
                const data = rows._array;
                resolve(data);
            });
        });
    });
};



// связать с БД, оформить в БД, сделать уникальными для county и type
export const Drop = ({ dropType, setSelectedItem, selectedItem, setIsVisible, is, onSelectItem }) => {
    const [visaData, setVisaData] = useState([]);

    const handlePress = (item) => {
        setSelectedItem(item.visaCountry || item.visaType);
        onSelectItem(item.visaCountry || item.visaType);
        setIsVisible(false); // Закрываем Drop после выбора элемента
    };


    useEffect(() => {
        if (dropType === 'visaType') {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT DISTINCT visaType FROM VisaInfo;`,
                    [],
                    (_, { rows }) => {
                        const data = rows._array;
                        setVisaData(data);
                    },
                    (error) => {
                        console.log('Ошибка при получении данных:', error);
                    }
                );
            });
        } else if (dropType === 'visaCountry') {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT DISTINCT visaCountry FROM VisaInfo;`,
                    [],
                    (_, { rows }) => {
                        const data = rows._array;
                        setVisaData(data);
                    },
                    (error) => {
                        console.log('Ошибка при получении данных:', error);
                    }
                );
            });
        }
    }, [dropType, db]);
    return (
        isVisible && (
            <View style={gStyle.Cards.drop}>
                {visaData.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handlePress(item)}
                    >
                        <View
                            style={[
                                gStyle.Cards.drop_component,
                                (item.visaCountry || item.visaType) === selectedItem ? gStyle.Cards.drop_component_focused : null,
                            ]}
                        >
                            <Text>{item.visaCountry || item.visaType}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        )
    );
};