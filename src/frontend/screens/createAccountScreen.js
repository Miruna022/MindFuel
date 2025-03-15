import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import {Button} from "../components/Button";
import {LogoBanner} from "../components/LogoBanner";
import {InputField} from "../components/InputField";
import Input from "react-native-ui-lib/src/components/textField/Input";
import Ionicons from "@expo/vector-icons/Ionicons";

export const CreateAccountScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <LogoBanner/>
            <View style={styles.authContainer}>
                <InputField fieldName={'Enter your email'} placeholder={'e.g. john.doe@gmail.com'} type={'text'}/>
                <InputField fieldName={'Create a password'} placeholder={'min. 8 characters'} type={'password'}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },

    authContainer: {
        paddingHorizontal: 24,
    }
})


