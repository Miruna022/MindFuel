import React, {useState} from "react";
import {View, Text, StyleSheet, SafeAreaView, Link, Alert, TouchableOpacity, TextInput} from "react-native";
import {Button} from "../components/Button";
import {LogoBanner} from "../components/LogoBanner";
import {InputField} from "../components/InputField";
import {StackActions} from "@react-navigation/native";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {useNavigation} from '@react-navigation/native';``
import {auth} from "../firebase/config";


export const CreateAccountScreen = () => {

    // TODO: Alert if email the user tries to register with
    //  is already taken (FirebaseError)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation()

    const register = async ({email, password}) => {
        // NOTE: Firebase enforces a .....@<domain>.com email format
        //  and a password of at least 6 characters.
        const credentials = await createUserWithEmailAndPassword(auth, email, password)
            .then((credentials) => {
                navigation.navigate('Quiz')
            })
            .catch(console.log)

    }

    return (
        <SafeAreaView style={styles.container}>
            <LogoBanner style={{flex: 1/9}}/>
            <View style={styles.titleCard}>
                <Text style={styles.titleText}>Create account</Text>
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
                    text={'Continue'}
                    style={{width: '100%', paddingHorizontal: '12', marginBottom: '12'}}
                    buttonStyle={{backgroundColor: '#C3B1E3'}}
                    onPress={() => register({email: email.trim(), password: password.trim()})}
                />
                <View style={{flexDirection: 'row', paddingHorizontal: 12}}>
                    <Text style={styles.logInText}>Already have an account? </Text>
                        <TouchableOpacity>
                            <Text
                                style={styles.pressableLogInText}
                                onPress={() => navigator.navigate('Login')}
                            >Log in</Text>
                        </TouchableOpacity>
                </View>
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


