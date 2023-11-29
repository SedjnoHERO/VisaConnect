import React, { useState, useEffect } from "react";
import * as Font from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import MainStack from "./navigation/navigate";
import { UserProvider } from "./screens/Auth/context"; // Импортируйте провайдер из вашего файла контекста

const fonts = () =>
  Font.loadAsync({
    "light": require("./assets/fonts/SF-Light.otf"),
    "med": require("./assets/fonts/SF-Medium.otf"),
    "bold": require("./assets/fonts/SF-Bold.otf"),
    "reg": require("./assets/fonts/SF-Regular.otf"),
  });

export default function App() {
  const [font, setFont] = useState(false);

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

  if (font) {
    return (
      <UserProvider>
        <MainStack />
      </UserProvider>
    );
  } else {
    return null;
  }
}
