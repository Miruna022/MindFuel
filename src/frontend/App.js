import React from 'react';
import { StyleSheet, View } from 'react-native';
import {AnswerButton} from "./components/AnswerButton";

export default function App() {
  return (
    // startScreen
    <View style={styles.container}>
      <AnswerButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
