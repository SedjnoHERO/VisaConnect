import * as SQlite from 'expo-sqlite';
import { TouchableOpacity } from 'react-native';

const db = SQlite.openDatabase('users.db');

export const initializeDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, passport TEXT, date TEXT, address TEXT, firstName TEXT, surname TEXT, fatherName TEXT, documentPath TEXT)'
        );
    });
};

export const checkExistingEmail = async (email) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM users WHERE username = ?',
                [email],
                (_, results) => {
                    const len = results.rows.length;
                    if (len > 0) {
                        console.log('Такая почта уже зарегистрирована');
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                (_, error) => {
                    console.log('Ошибка SQL:', error);
                    reject(error);
                }
            );
        });
    });
};

export const registerUser = async (username, password) => {
    try {
        await checkExistingEmail(username);

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO users (username, password) VALUES (?, ?)',
                    [username, password],
                    (_, results) => {
                        if (results.rowsAffected > 0) {
                            console.log('Пользователь успешно зарегистрирован');
                            resolve('Пользователь успешно зарегистрирован');
                        } else {
                            console.log('Ошибка при регистрации пользователя');
                            reject('Ошибка при регистрации пользователя');
                        }
                    },
                    (_, error) => {
                        console.log('Ошибка SQL:', error);
                        reject(error);
                    }
                );
            });
        });
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (username, password) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM users WHERE username = ? AND password = ?',
                [username, password],
                (_, results) => {
                    const len = results.rows.length;
                    if (len > 0) {
                        resolve('Авторизация успешна');
                    } else {
                        reject('Неверный логин или пароль');
                    }
                },
                (_, error) => {
                    console.log('Ошибка SQL:', error);
                    reject(error);
                }
            );
        });
    });
};





// для проверки всех существующих пользователей
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM users',
                [],
                (_, results) => {
                    const len = results.rows.length;
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            const row = results.rows.item(i);
                            console.log(`Пользователь ${row.username}, Пароль ${row.password}, ID: ${row.id}`);
                        }
                    } else {
                        console.log('Нет зарегистрированных пользователей');
                    }
                }
            );
        });
    })
};
const deleteAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM users',
                [],
                (_, results) => {
                    resolve(results);
                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const InformationAbout = ({ actionType }) => {
    const handlePress = () => {
        if (actionType === 'delete') {
            deleteAllUsers()
                .then(() => {
                    console.log('Пользователи удалены');
                })
                .catch(error => {
                    console.log('Ошибка удаления пользователей:', error);
                });
        } else if (actionType === 'display') {
            getAllUsers();
        }
    };

    const infColor = actionType === 'delete' ? 'red' : 'blue';
    const positionStyle = actionType === 'delete' ? { left: 50, bottom: 50 } : { right: 50, bottom: 50 };

    return (
        <TouchableOpacity
            style={{
                width: 50,
                height: 50,
                position: 'absolute',
                borderRadius: 100,
                backgroundColor: infColor,
                ...positionStyle
            }}
            onPress={handlePress}
        />
    );
};
