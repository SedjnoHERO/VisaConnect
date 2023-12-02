import React, { useState, useEffect } from "react";
import * as Font from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import MainStack from "./navigation/navigate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProvider } from "./screens/Auth/context";

const loadFonts = async () => {
  await Font.loadAsync({
    "light": require("./assets/fonts/SF-Light.otf"),
    "med": require("./assets/fonts/SF-Medium.otf"),
    "bold": require("./assets/fonts/SF-Bold.otf"),
    "reg": require("./assets/fonts/SF-Regular.otf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [storedLogin, setStoredLogin] = useState('');

  useEffect(() => {
    async function loadApp() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
        setFontLoaded(true);
        await checkLogin();
        setAppReady(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.log('Ошибка запуска', error)
      }
    }
    loadApp();
  }, []);

  const checkLogin = async () => {
    try {
      const result = await AsyncStorage.getItem('UserLogin');
      if (result !== null) {
        setStoredLogin(JSON.parse(result));
      } else {
        setStoredLogin(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!appReady || !fontLoaded) {
    return null;
  }

  return (
    <UserProvider>
      <MainStack />
    </UserProvider>
  );
}
