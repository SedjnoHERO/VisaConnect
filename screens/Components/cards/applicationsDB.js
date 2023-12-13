import * as SQLite from 'expo-sqlite';
import { TouchableOpacity, Text } from 'react-native';
import * as gStyle from '../../../assets/Styles/globalStyle';

const db = SQLite.openDatabase('Applications.db');


//добавить в БД даты, количество въездов, количество дней, статус.
export const createApplicationsTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Applications (
                        application_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER,
                        visa_id INTEGER,
                        cost REAL,
                        first_name TEXT,
                        last_name TEXT,
                        father_name TEXT,
                        visa_type TEXT,
                        visa_country TEXT,
                        note TEXT,
                        photo_path TEXT
                    );`,
            [],
            () => {
                console.log('Таблица Applications создана');
            },
            (_, error) => {
                console.log('Ошибка создания таблицы Applications:', error);
            }
        );
    });
};

// ...
const addApplication = (userId, visaId, cost, firstName, lastName, fatherName, visaType, visaCountry, note, photoPath) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO Applications (user_id, visa_id, cost, first_name, last_name, father_name, visa_type, visa_country, note, photo_path) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, visaId, cost, firstName, lastName, fatherName, visaType, visaCountry, note, photoPath],
            (_, { insertId }) => {
                console.log('Заявка добавлена, ID:', insertId);
            },
            (_, error) => {
                console.log('Ошибка добавления заявки:', error);
            }
        );
    });
};

export const FetchButton = ({ active, userId, visaId, cost, firstName, lastName, fatherName, visaType, visaCountry, note }) => {
    const handleAddApplication = () => {
        addApplication(userId, visaId, cost, firstName, lastName, fatherName, visaType, visaCountry, note);
    };

    return (
        <TouchableOpacity
            onPress={handleAddApplication}
            style={gStyle.ButtonStyles.button_continue}
            disabled={!active}
        >
            <Text style={{ color: 'white' }}>Отправить заявку</Text>
        </TouchableOpacity>
    );
};

//Админ
export const fetchApplicData = (setAppl) => {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM Applications', [], (_, { rows }) => {
            const fetchedApplic = rows._array;
            setAppl(fetchedApplic);
        });
    });
};

// вывод всех заявок
export const getAllApplications = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Applications',
                [],
                (_, results) => {
                    const len = results.rows.length;
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            const row = results.rows.item(i);
                            console.log(`applicID: ${row.application_id}, visaID: ${row.visa_id}, userID: ${row.user_id}, Цена: ${row.cost}, Имя: ${row.first_name}, Фамилия: ${row.last_name}, Отчество: ${row.father_name}, Тип визы: ${row.visa_type}, Страна для визы: ${row.visa_country}, Примечание: ${row.note}`);
                        }
                    } else {
                        console.log('Нет сохраненных заявок');
                    }
                },
                (_, error) => {
                    console.log('Ошибка при выборке заявок:', error);
                }
            );
        });
    });
};


export const ShowAllApplic = () => {
    return (
        <TouchableOpacity
            onPress={getAllApplications}
            style={{
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 20,
            }}
        >
            <Text style={{ color: 'white' }}>Получить все заявки</Text>
        </TouchableOpacity>
    )
}

const deleteAllApplic = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM Applications',
                [],
                (_, results) => {
                    resolve(results);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};