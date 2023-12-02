import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const UserContext = createContext({
    storedLogin: {},
    setStoredLogin: () => { },
});

export const UserProvider = ({ children }) => {
    const [storedLogin, setStoredLogin] = useState({});
    const [otherData, setOtherData] = useState({});

    useEffect(() => {

        setOtherData({})
    })

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

    const contextValue = {
        storedLogin,
        setStoredLogin: persistLogin,
        otherData
    };

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
