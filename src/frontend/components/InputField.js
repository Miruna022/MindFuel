import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useState } from "react";


export const InputField = ({
    fieldName,
    placeholder,
    onChangeText,
    style = null
   }) => {

    return (
        <View style={[styles.fieldContainer, style]}>
            <Text style={styles.fieldName}>{fieldName}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputField}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fieldContainer: {
        padding: 11,
    },

    inputContainer: {
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 8,
        paddingHorizontal: 8,
    },

    inputField: {
        fontFamily: 'Inter-Medium',
        fontSize: 16,
    },

    fieldName: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
    }
})

