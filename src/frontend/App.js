import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StartScreen } from './screens/startScreen';
import { useFonts } from 'expo-font';
import {AnswerScreen} from "./screens/answerScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <AnswerScreen/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
