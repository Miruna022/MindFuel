import React from "react";
import {View, Text, StyleSheet, SafeAreaView, ImageBackground, Alert} from "react-native";
import {Button} from "../components/Button";
import {LogoBanner} from "../components/LogoBanner";
import {InputField} from "../components/InputField";
import {Link} from "@react-navigation/native"

export const LoginScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <LogoBanner style={{flex: 1/9}}/>
            <View style={styles.titleCard}>
                <Text style={styles.titleText}>Welcome back!</Text>
            </View>
            <View style={styles.authContainer}>
                <InputField fieldName={'Enter your email'} placeholder={'e.g. john.doe@gmail.com'} type={'text'}/>
                <InputField fieldName={'Enter your password'} placeholder={''} type={'password'}/>
                <Button text={'Sign in'} style={{width: '100%', paddingHorizontal: '12', marginBottom: '12'}} buttonStyle={{backgroundColor: '#C3B1E3'}}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 50,
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