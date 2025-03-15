import React, {useState} from "react";
import {View, Text, StyleSheet, SafeAreaView, Alert, TextInput} from "react-native";
import {Button} from "../components/Button";
import {LogoBanner} from "../components/LogoBanner";
import {InputField} from "../components/InputField";
import {auth} from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import {useNavigation} from "@react-navigation/native";

export const LoginScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigator = useNavigation()

    const signIn = async ({email, password}) => {
        try {
            console.log(`Received email: ${email} and password: ${password}`)
            await signInWithEmailAndPassword(auth, email, password);
            // TODO: Should be CoursesScreen
            navigator.navigate('Start')
        } catch (error) {
            Alert.alert("Error when logging into account",
                "Failed to log in into the account: " + error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <LogoBanner style={{flex: 1/9}}/>
            <View style={styles.titleCard}>
                <Text style={styles.titleText}>Welcome back!</Text>
            </View>
            <View style={styles.authContainer}>
                <InputField
                    fieldName={"Enter your email"}
                    placeholder={"e.g. john.doe@gmail.com"}
                    onChangeText={setEmail}
                />
                <InputField
                    fieldName={"Create a password"}
                    onChangeText={setPassword}
                />
                <Button
                    text={'Sign in'}
                    style={{width: '100%', paddingHorizontal: '12', marginBottom: '12'}}
                    buttonStyle={{backgroundColor: '#C3B1E3'}}
                    onPress={() => signIn({email: email.trim(), password: password.trim()})}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 20,

    },

    authContainer: {
        paddingHorizontal: 10,
        marginHorizontal: 12,
        flex: 2/3,
    },

    titleCard: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2/20,
    },

    titleText: {
        fontFamily: 'Inter-Bold',
        fontSize: 32,
    },

    logInText: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
    },

    pressableLogInText: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        textDecorationLine: 'underline',
    }
})

/*
<SafeAreaView style={styles.container}>
            <LogoBanner style={{flex: 1/9}}/>
            <View style={styles.titleCard}>
                <Text style={styles.titleText}>Welcome back!</Text>
            </View>
            <View style={styles.authContainer}>
                <TextInput fieldName={'Enter your email'} placeholder={'e.g. john.doe@gmail.com'} type={'text'} onChangeText = {setEmail}/>
                <TextInput fieldName={'Enter your password'} placeholder={''} type={'password'} onChangeText = {setPassword}/>
                <Button
                    text={'Sign in'}
                    style={{width: '100%', paddingHorizontal: '12', marginBottom: '12'}}
                    buttonStyle={{backgroundColor: '#C3B1E3'}}
                    onPress={() => signIn({email: email.trim(), password: password.trim()})}
                />
            </View>
        </SafeAreaView>
 */