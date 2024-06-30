import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
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
        <Stack.Screen name="(auth)/Otp" options={{ headerShown: false, navigationBarHidden: true }} />
        <Stack.Screen name="profileMaker/profileMaker" options={{ headerShown: false, navigationBarHidden: true }} />
        <Stack.Screen name="profileMaker/questions" options={{ headerShown: false, navigationBarHidden: true }} />
        <Stack.Screen name="index" options={{ headerShown: false, navigationBarHidden: true }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
