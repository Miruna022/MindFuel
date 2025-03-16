import { StatusBar } from 'expo-status-bar';
import {Alert, StyleSheet, Text, View} from 'react-native';
import { StartScreen } from './screens/startScreen';
import { useEffect, useState } from 'react'
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
import LoadVidScreen from "./screens/LoadVidScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Start',
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

    const [showLoadingScreen, setShowLoadingScreen] = useState(true)
    const [initialRoute, setInitialRoute] = useState('Start')

    useEffect(() => {

        const checkFirstTime = async () => {
            try {
                const appOpenedBefore = await AsyncStorage.getItem('appOpenedBefore')
                console.log("App opened before? ", appOpenedBefore)
                const userLoggedIn = await AsyncStorage.getItem('userLoggedIn')
                console.log("User logged in? ", userLoggedIn)

                if (!appOpenedBefore) {
                    // Set the app opened before flag
                    await AsyncStorage.setItem('appOpenedBefore', 'true')
                    setInitialRoute('Start')
                } else {
                    // App has been opened before
                    //  initial screen will either be Courses or Start->CreateAccount
                    setInitialRoute(userLoggedIn ? 'Courses' : 'Start')
                }
            } catch (error) {
                Alert.alert("Error checking user status", "Failed to check user status: " + error)
            }

            setTimeout(() => {
                setShowLoadingScreen(false)
            }, 2000)
        }

        checkFirstTime();

    }, [])

    if (showLoadingScreen) {
        return <LoadVidScreen/>
    }

    return <Navigation/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
