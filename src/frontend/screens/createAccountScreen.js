import React from "react";
import {View, Text, StyleSheet, SafeAreaView, Link, Alert, TouchableOpacity} from "react-native";
import {Button} from "../components/Button";
import {LogoBanner} from "../components/LogoBanner";
import {InputField} from "../components/InputField";
import {StackActions, useNavigation} from "@react-navigation/native";
import {StartScreen} from "./startScreen";

export const CreateAccountScreen = () => {

    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <LogoBanner style={{flex: 1/9}}/>
            <View style={styles.titleCard}>
                <Text style={styles.titleText}>Create account</Text>
            </View>
            <View style={styles.authContainer}>
                <InputField fieldName={'Enter your email'} placeholder={'e.g. john.doe@gmail.com'} type={'text'}/>
                <InputField fieldName={'Create a password'} placeholder={'min. 8 characters'} type={'password'}/>
                <Button text={'Continue'} style={{width: '100%', paddingHorizontal: '12', marginBottom: '12'}} buttonStyle={{backgroundColor: '#C3B1E3'}}/>
                <View style={{flexDirection: 'row', paddingHorizontal: 12}}>
                    <Text style={styles.logInText}>Already have an account? </Text>
                        <TouchableOpacity>
                            <Text
                                style={styles.pressableLogInText}
                                onPress={() => navigation.reset({index: 1, routes: [
                                        {name: 'Start'},
                                        {name: 'Login'},
                                        ]})}
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


