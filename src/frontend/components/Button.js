import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useFonts} from "expo-font";

export const Button = ({ text }) => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
    {
        button: {
            borderRadius: 8,
            paddingVertical: 15,
            paddingHorizontal: 16,
            backgroundColor: '#8F6CC6',
            borderWidth: 3,
            alignSelf: 'center',
            alignItems: 'center',
            width: '100%',
        },

        buttonText: {
            fontFamily: 'Inter-ExtraBold',
            fontSize: 18,
        }
    }
)