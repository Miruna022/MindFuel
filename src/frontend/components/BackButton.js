import React from 'react';
import {TouchableOpacity, Alert, Image, StyleSheet} from 'react-native';

export const BackButton = () => {
    return (
        <TouchableOpacity onPress={() => {Alert.alert("You are going back")}}>
            <Image source={require('../assets/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: 30,
        height: 30,
        right: 45,
    },
})