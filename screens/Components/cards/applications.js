import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('applications.db');

const createApplicationsTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Applications (
        application_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        visa_id INTEGER,
        first_name TEXT,
        last_name TEXT,
        middle_name TEXT,
        visa_type TEXT,
        visa_country TEXT,
        photo_path TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (visa_id) REFERENCES visa(ID)
      );`
        );
    });
};

// Функция для добавления новой заявки в таблицу Applications
const addApplication = (userId, visaId, firstName, lastName, middleName, visaType, visaCountry, photoPath) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO Applications (user_id, visa_id, first_name, last_name, middle_name, visa_type, visa_country, photo_path) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, visaId, firstName, lastName, middleName, visaType, visaCountry, photoPath],
            (_, { insertId }) => {
                console.log('Заявка добавлена, ID:', insertId);
            },
            (_, error) => {
                console.log('Ошибка добавления заявки:', error);
            }
        );
    });
};
