import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import startCards from './startCards.json';
import { TouchableOpacity, View, Text } from 'react-native';
import * as gStyle from "../../../assets/Styles/globalStyle";

const db = SQLite.openDatabase('visa.db');

// Создаем таблицу в базе данных, если она не существует
export const createTable = () => {
    clearTable()
    loadFromJsonToDB();
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS VisaInfo (ID INTEGER PRIMARY KEY AUTOINCREMENT, visaCountry TEXT, visaType TEXT, cost REAL);'
        );
    });
};

const clearTable = () => {
    try {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM VisaInfo;', [], (_, result) => {
                console.log('Таблица VisaInfo успешно очищена.');
            });
        });
    } catch (error) {
        console.log('Ошибка при очистке таблицы VisaInfo:', error);
    }
};


// Загружаем данные из JSON файла в базу данных
let dataLoaded = false;

const loadFromJsonToDB = async () => {
    try {
        if (!dataLoaded) {
            const data = startCards;
            db.transaction((tx) => {
                data.forEach((item) => {
                    tx.executeSql(
                        'INSERT INTO VisaInfo (id, visaCountry, visaType, cost) VALUES (?, ?, ?, ?);',
                        [item.id, item.visaCountry, item.visaType, item.cost]
                    );
                });
            });
            dataLoaded = true;
        } else {
        }
    } catch (error) {
        console.log('Ошибка перехода из JSON в БД:', error);
    }
};

//для админа
export const insertDataToVisaInfo = (visaCountry, visaType, cost) => {
    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO VisaInfo (visaCountry, visaType, cost) VALUES (?, ?, ?);',
            [visaCountry, visaType, cost],
            (_, results) => {
                console.log('Данные успешно добавлены в таблицу VisaInfo');
            },
            (_, error) => {
                console.log('Ошибка при добавлении данных в таблицу VisaInfo:', error);
            }
        );
    });
};
export const LoadButton = ({ buttonState, country, type, cost }) => {
    const handlePress = insertDataToVisaInfo(country, type, cost);
    return (
        <TouchableOpacity onPress={handlePress} disabled={buttonState} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
            <Text style={{ color: buttonState ? '#242424' : '#d3d3d3' }}>Добавить визу</Text>
        </TouchableOpacity>
    )
}

//показать всё из visa.db
export const fetchDataFromDB = (setVisaInfo) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM VisaInfo;',
            [],
            (_, { rows }) => {
                const data = rows._array;
                setVisaInfo(data)
            },
            (_, error) => {
                console.log('Ошибка при извлечении данных:', error);
            }
        );
    });
};


export const getAdditionalInfo = ({ visaType, visaCountry }, callback) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT ID, cost FROM VisaInfo WHERE visaType = ? AND visaCountry = ?;',
            [visaType, visaCountry],
            (_, results) => {
                const len = results.rows.length;
                if (len > 0) {
                    const fetchedData = [];
                    for (let i = 0; i < len; i++) {
                        const { ID, cost } = results.rows.item(i);
                        fetchedData.push({ ID, cost });
                        console.log(`ID: ${ID}, Страна: ${visaCountry}, Тип: ${visaType}, Стоимость: ${cost}`);
                    }
                    callback(fetchedData); // Передача данных через колбэк
                } else {
                    callback([]); // Если нет записей, передаем пустой массив
                }
            },
            (txObj, error) => console.error('Ошибка:', error)
        );
    });
};

export const Drop = ({ dropType, setSelectedItem, selectedItem, setIsVisible, isVisible, onSelectItem }) => {
    const [visaData, setVisaData] = useState([]);

    const handlePress = (item) => {
        const selected = item.visaCountry || item.visaType;
        setSelectedItem(selected);
        onSelectItem(selected);
        setIsVisible(false);
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
    }, [dropType]);

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
