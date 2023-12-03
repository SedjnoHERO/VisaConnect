import * as SQlite from 'expo-sqlite';
import { TouchableOpacity, Text } from 'react-native';
import { useUserContext } from './context';

const db = SQlite.openDatabase('users.db');

export const initializeDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, passport TEXT, date TEXT, firstName TEXT, surname TEXT, fatherName TEXT, documentPath TEXT, lastLogin TEXT DEFAULT NULL, isAdmin TEXT)',
            [],
            (_, results) => {
                console.log('Таблица пользователей успешно создана или уже существует');
            },
            (_, error) => {
                console.log('Ошибка создания таблицы пользователей:', error);
            }
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

export const checkLogin = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM users WHERE lastLogin IS NOT NULL AND lastLogin != ''",
                [],
                (_, results) => {
                    const users = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        const user = results.rows.item(i);
                        users.push(user);
                    }
                    if (users.length > 0) {
                        console.log("Последний вошедший:", users);
                        resolve(users);
                    } else {
                        console.log("Нету последнего пользователя");
                        resolve([]);
                    }
                },
                (_, error) => {
                    console.log("SQL ошибка:", error);
                    reject(error);
                }
            );
        });
    });
};



export const loginUser = async (username, password, setStoredLogin) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM users WHERE username = ? AND password = ?',
                [username, password],
                (_, results) => {
                    const len = results.rows.length;
                    if (len > 0) {
                        const user = results.rows.item(0);
                        const currentDate = new Date().toISOString(); // Get current date/time
                        db.transaction(tx => {
                            tx.executeSql(
                                'UPDATE users SET lastLogin = ? WHERE id = ?',
                                [currentDate, user.id],
                                (_, updateResult) => {
                                    if (updateResult.rowsAffected > 0) {
                                        resolve('Авторизация успешна');
                                    } else {
                                        reject('Ошибка обновления lastLogin');
                                    }
                                },
                                (_, error) => {
                                    console.log('Ошибка SQL при обновлении lastLogin:', error);
                                    reject(error);
                                }
                            );
                        });
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




export const Logout = ({ navigation }) => {
    const { logout } = useUserContext();

    return (
        <TouchableOpacity
            onPress={logout}
            style={{
                backgroundColor: 'red',
                color: 'white',
                width: 100,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text style={{ color: 'white' }}>Выйти</Text>
        </TouchableOpacity>
    );
};

// для проверки всех существующих пользователей
export const getAllUsers = () => {
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
                            console.log(results.rows);
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
                'DROP TABLE IF EXISTS users',
                [],
                (_, results) => {
                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, passport TEXT, date TEXT, firstName TEXT, surname TEXT, fatherName TEXT, documentPath TEXT, lastLogin TEXT DEFAULT NULL, isAdmin TEXT)',
                        [],
                        (_, results) => {
                            resolve(results);
                        },
                        (_, error) => {
                            reject(error);
                        }
                    );
                },
                (_, error) => {
                    reject(error);
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

