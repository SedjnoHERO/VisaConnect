import React, { createContext, useContext, useState, useEffect } from "react";
import * as SQlite from 'expo-sqlite';

const db = SQlite.openDatabase('users.db');

export const UserContext = createContext({
    storedLogin: {},
    setStoredLogin: () => { },
});

export const UserProvider = ({ children }) => {
    const [storedLogin, setStoredLogin] = useState({});
    const [otherData, setOtherData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const initializeUserContext = async () => {
            try {
                const result = await persistLogin();
                if (result !== null) {
                    setOtherData(result);
                } else {
                    setOtherData(null);
                }
                await checkUserAdminStatus();
                console.log(isAdmin);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        initializeUserContext();
    }, []);


    const handleCheckLogin = async () => {
        try {
            const user = await persistLogin();
            if (user && user.id) {
                setStoredLogin(result);
                const isAdmin = await checkUserAdminStatus();
                if (isAdmin) {
                    console.log('Вы админ, вот вам и админ экран')
                }
            } else {
                setStoredLogin(null);
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        handleCheckLogin();
    }, []);

    useEffect(() => {
        if (Object.keys(storedLogin).length !== 0) {
            console.log("Пользователь авторизован:", storedLogin.username);
            console.log("id:", storedLogin.id);
        } else {
            console.log("Нет авторизованного пользователя");
        }
    }, [storedLogin]);

    const persistLogin = () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM users WHERE lastLogin IS NOT null AND lastLogin != "" LIMIT 1',
                    [],
                    (_, results) => {
                        if (results.rows.length > 0) {
                            const user = results.rows.item(0);
                            resolve(user);
                        } else {
                            console.log("Нет авторизированного пользователя");
                            resolve({});
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

    const checkUserAdminStatus = () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM users WHERE isAdmin IS NOT null AND isAdmin != "" LIMIT 1',
                    [],
                    (_, results) => {
                        if (results.rows.length > 0) {
                            const isAdmin = results.rows.item(0).isAdmin === 'true';
                            resolve(isAdmin);
                            setIsAdmin(true);
                        } else {
                            resolve(false);
                            setIsAdmin(false)
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

    const contextValue = {
        storedLogin,
        loading,
        setStoredLogin: persistLogin,
        otherData,
        isAdmin,
    };

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
