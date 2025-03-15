import React, { useState } from 'react';
import {Text, StyleSheet, TouchableOpacity, Image, View} from 'react-native';

export const AnswerButton = ({ isSelected, onPress, label }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: isSelected ? '#C3B1E1' : 'white' }]}
            onPress={onPress}
        >
            <View style={styles.content}>
                <Image source={isSelected ? require('../assets/check.png') : require('../assets/uncheck.png')} style={styles.circles} />
                <Text style={styles.buttonText}>{label}</Text>
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
        width: '93%',
        borderWidth: 3,
        minHeight: 64,
        height: 'auto',
        borderRadius: 10,
        marginVertical: 10,

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