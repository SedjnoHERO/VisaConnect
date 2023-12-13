import * as SQlite from 'expo-sqlite';
import { TouchableOpacity, Text } from 'react-native';
import { UserContext } from './context';
import { useCallback, useState } from 'react';
import * as gStyle from '../../assets/Styles/globalStyle';

const db = SQlite.openDatabase('users.db');

export const initializeDatabase = () => {
    initializeAdminUser();
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

const initializeAdminUser = () => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM users WHERE username = ?',
            ['admin'],
            (_, results) => {
                if (results.rows.length === 0) {
                    tx.executeSql(
                        'INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)',
                        ['admin', 'admin', 'true'],
                        (_, insertResults) => {
                            console.log('Пользователь admin успешно добавлен');
                        },
                        (_, error) => {
                            console.log('Ошибка при добавлении пользователя:', error);
                        }
                    );
                }
            },
            (_, error) => {
                console.log('Ошибка при проверке пользователя:', error);
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
                        const currentDate = new Date().toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '');

                        db.transaction(innerTx => {
                            innerTx.executeSql(
                                'UPDATE users SET lastLogin = ? WHERE id = ?',
                                [currentDate, user.id],
                                (_, updateResult) => {
                                    if (updateResult.rowsAffected > 0) {
                                        if (user.isAdmin === 'true') {
                                            resolve({ message: 'Авторизация успешна для администратора', isAdmin: true });
                                        } else {
                                            resolve({ message: 'Авторизация успешна', isAdmin: false });
                                        }
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
    const handleLogout = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE users SET lastLogin = null',
                [],
                (_, results) => {
                    console.log('Пользователь вышел из системы.');
                    navigation.navigate('Step3');
                },
                (_, error) => {
                    console.log('Ошибка при очистке lastLogin:', error);
                }
            );
        });
    };

    return (
        <TouchableOpacity
            onPress={handleLogout}
            style={gStyle.ButtonStyles.button_continue}
        >
            <Text style={[gStyle.Texts.normal_ts, { color: 'white' }]}>Выйти из аккаунта</Text>
        </TouchableOpacity>
    );
};

// для админа
export const fetchUsersData = (setUsers) => {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
            const fetchedUsers = rows._array;
            setUsers(fetchedUsers);
        });
    });
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
                            const elements = [];
                            for (const key in row) {
                                if (row[key] !== null) {
                                    elements.push(`${key}: ${row[key]}`);
                                }
                            }
                            console.log(elements.join(', '));
                        }
                    } else {
                        console.log('Нет зарегистрированных пользователей');
                    }
                }
            );
        });
    });
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
    const handlePress = useCallback(() => {
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
    }, [actionType]);

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



