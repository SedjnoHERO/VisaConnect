import React, { useState, useEffect } from "react";
import * as Font from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import MainStack from "./navigation/navigate";

const fonts = () => {
  Font.loadAsync({
    "light": require("./assets/fonts/SF-Light.otf"),
    "med": require("./assets/fonts/SF-Medium.otf"),
    "bold": require("./assets/fonts/SF-Bold.otf"),
    "reg": require("./assets/fonts/SF-Regular.otf"),
  });
}

import AppLoading from 'expo-app-loading';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "./screens/Auth/context";

export default function App() {
  const [font, setFont] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [storedLogin, setStoredLogin] = useState('')

  useEffect(() => {
    async function loadFonts() {
      try {
        await fonts();
        setFont(true);
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.log('Ошибка запуска', error)
      }
    }
    loadFonts();
  }, []);


  const checkLogin = () => {
    AsyncStorage
      .getItem('UserLogin')
      .then((result) => {
        if (result !== null) {
          setStoredLogin(JSON.parse(result));
        } else {
          setStoredLogin(null);
        }
      })
      .catch(error => console.log(error))
  }

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLogin}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    )
  }

  if (font && appReady) {
    return (
      <UserContext value={{ storedLogin, setStoredLogin }}>
        <MainStack />
      </UserContext>
    );
  } else {
    return null;
  }

}
