import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from "react-native";

export const StartScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../assets/start-screen-gradient.webp')}
                resizeMode={'stretch'}
                />
            <View style={styles.card}>
                <View style={styles.mottoText}>
                    <Text>A fun new way to learn</Text>
                    <Text>All in your pocket</Text>
                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },

        card: {
            backgroundColor: '#fff',
        },

        mottoText: {
            // idk
        }
    }
)

