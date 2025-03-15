import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {StartScreen, } from './screens/startScreen';
import {useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";

// Prevent splash screen from hiding by itself (we will hide it manually)
SplashScreen.preventAutoHideAsync();

export default function App() {

  // Load fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    console.log("Fonts not loaded yet!")
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <View style={styles.container}>
      <StartScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
});
