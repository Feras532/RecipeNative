import { LogBox } from 'react-native';
import React, { useEffect } from 'react';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
LogBox.ignoreLogs([
  'fontFamily "kanit-Regular" is not a system font and has not been loaded through expo-font',
]);
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, navigationBarHidden: true }} />
        <Stack.Screen name="(auth)/VerifyEmail" options={{ headerShown: false, navigationBarHidden: true }} />
        <Stack.Screen name="profileMaker/profileMaker" options={{ headerShown: false, navigationBarHidden: true }} />
        <Stack.Screen name="profileMaker/questions" options={{ headerShown: false, navigationBarHidden: true }} />
        <Stack.Screen name="index" options={{ headerShown: false, navigationBarHidden: true }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
