import React from 'react';
import {TouchableOpacity, Alert, Image, StyleSheet, View, Text} from 'react-native';

export const NextButton = () => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => {Alert.alert("Next button pressed :D")}}>
            <View style={styles.content}>
                <Text style={styles.buttonNext}>Next</Text>
                <Image source={require('../assets/right.png')} style={styles.nextIcon} />
            </View>
        </TouchableOpacity>
    )
}

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
        minHeight: 70,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#8F6CC6',
        marginBottom: -20,

    },
    buttonNext: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginLeft: 25,
        width: '80%',
    },
    nextIcon: {
        width: 50,
        height: 50,
        right: 10,
    },
})