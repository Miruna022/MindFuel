import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import {Button} from "../components/Button";

export const StartScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={require('../assets/start-screen-gradient.webp')}
                resizeMode={'stretch'}>
            <View style={styles.card}>
                <View style={styles.mottoContainer}>
                    <Text style={styles.mottoTitle}>A fun new way to learn</Text>
                    <Text style={styles.mottoSubtitle}>All in your pocket</Text>
                </View>
                <Button text="Start now!"/>
            </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },

        image: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },

        card: {
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            verticalAlign: 'center',
            borderRadius: 40,
            borderWidth: 2,
            backgroundColor: '#fff',
            width: '90%',
            height: '50%',
            padding: 33,
        },

        mottoContainer: {
            flex: 4/5,
            alignItems: 'center',
        },

        mottoTitle: {
            // NOTE: Avoid adding font weights since
            //  undefined behaviour (font not loading)
            fontFamily: 'Inter-SemiBold',
            textAlign: 'center',
            fontSize: 30,
        },

        mottoSubtitle: {
            fontFamily: 'Inter-Medium',
            fontSize: 24,
        }
    }
)

