import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

export const BackButton = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.press} onPress={onPress}>
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
    },
    press: {
        right: 45,
    },
})