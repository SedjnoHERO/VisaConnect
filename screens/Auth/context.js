import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkLogin } from "./usersDB";


export const UserContext = createContext({
    storedLogin: {},
    setStoredLogin: () => { },
});

export const UserProvider = ({ children }) => {
    const [storedLogin, setStoredLogin] = useState({});
    const [otherData, setOtherData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeUserContext = async () => {
            try {
                const result = await checkLogin();
                if (result !== null) {
                    setOtherData(result);
                } else {
                    setOtherData(null);
                }
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
            const result = await checkLogin();
            if (result !== null) {
                setStoredLogin(result);
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
        } else {
            console.log("Нет авторизованного пользователя");
        }
    }, [storedLogin]);

    const persistLogin = (credential) => {
        AsyncStorage.setItem("UserLogin", JSON.stringify(credential))
            .then(() => {
                setStoredLogin(credential);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const logout = () => {
        setStoredLogin({});
    };

    const contextValue = {
        storedLogin,
        loading,
        setStoredLogin: persistLogin,
        otherData,
    };

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
