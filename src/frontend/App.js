import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StartScreen } from './screens/startScreen';
import { useFonts } from 'expo-font';

export default function App() {
  return (
    <View style={styles.container}>
      <StartScreen/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
