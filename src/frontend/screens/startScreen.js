import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from "react-native";

const StartScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/start-screen-gradient.webp')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
    }
)

