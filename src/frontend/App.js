import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StartScreen } from './screens/startScreen';
import { useFonts } from 'expo-font';
import {AnswerScreen} from "./screens/answerScreen";
import {CreateAccountScreen} from "./screens/createAccountScreen";
import {LoginScreen} from "./screens/loginScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createStaticNavigation, NavigationContainer} from "@react-navigation/native";

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Start',
    screens: {
        Start: StartScreen,
        CreateAccount: CreateAccountScreen,
        Login: LoginScreen,
    },
    screenOptions: {
        headerShown: false,
    }
})

const Navigation = createStaticNavigation(RootStack)

export default function App() {
  return (
      <Navigation/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
