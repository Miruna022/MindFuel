import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StartScreen } from './screens/startScreen';
import { useFonts } from 'expo-font';
import {CreateAccountScreen} from "./screens/createAccountScreen";
import {LoginScreen} from "./screens/loginScreen";
import {AnswerScreen} from "./screens/answerScreen";
import {TeacherAscreen} from "./screens/TeacherAscreen";
import {TeacherBscreen} from "./screens/TeacherBscreen";
import {TeacherCscreen} from "./screens/TeacherCscreen";
import {TeacherDscreen} from "./screens/TeacherDscreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createStaticNavigation, NavigationContainer} from "@react-navigation/native";
import {SectionsScreen} from "./screens/CoursesScreen";
import {SectionDetailsScreen} from "./screens/SectionsDetails";

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Courses',
    screens: {
        Start: StartScreen,
        CreateAccount: CreateAccountScreen,
        Login: LoginScreen,
        Quiz: AnswerScreen,
        TeacherA: TeacherAscreen,
        TeacherB: TeacherBscreen,
        TeacherC: TeacherCscreen,
        TeacherD: TeacherDscreen,
        Courses: SectionsScreen,
        Section: SectionDetailsScreen,
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
