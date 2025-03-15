import React, { useState } from 'react';
import {Text, Alert, StyleSheet, TouchableOpacity, Image, View} from 'react-native';

export const AnswerButton = () => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: isPressed ? '#C3B1E1' : 'white' }]}
            onPressIn={() => setIsPressed(!isPressed)}
        >
            <View style={styles.content}>
                <Image source={isPressed ? require('../assets/check.png') : require('../assets/uncheck.png')} style={styles.circles} />
                <Text style={styles.buttonText}>Answer here</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        borderWidth: 3,
        minHeight: 64,
        height: 'auto',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        marginLeft: 20,
        width: '80%',
    },
    circles: {
        width: '28',
        height: '28',
        marginLeft: 15,
    },
})