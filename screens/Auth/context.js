import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext } from "react";

export const UserContext = createContext({ storedLogin: {}, setStoredLogin: () => { } })

const { storedLogin, setStoredLogin } = useContext(UserContext)

export const persistLogin = (Login, message, status) => {
    AsyncStorage.setItem('UserLogin', JSON.stringify(Credential))
        .then(() => {
            setStoredLogin(Credential);
        })
        .catch((error) => {
            console.log(error);
        })
}

