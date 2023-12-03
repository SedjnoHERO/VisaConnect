import React, { useState, useEffect } from "react";
import * as Font from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import MainStack from "./navigation/navigate";
import { UserProvider } from "./screens/Auth/context";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

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
        // await handleCheckLogin();
        setAppReady(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.log('Ошибка запуска', error)
      }
    }
    loadApp();
  }, []);


  if (!appReady || !fontLoaded) {
    return null;
  }

  return (
    <UserProvider>
      <MainStack />
    </UserProvider>
  );
}
