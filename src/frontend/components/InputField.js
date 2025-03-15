import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useState } from "react";


export const InputField = ({
    fieldName,
    placeholder,
    type
   }) => {

    const [isFilled, setIsFilled] = useState(false);

    const handleTextChange = (text) => {
        setIsFilled(text.length > 0);
    };

    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.fieldName}>{fieldName}</Text>
            {type === 'password' &&
                <PasswordInput
                    style={styles.inputField}
                    placeholder={placeholder}
                    isFilled={isFilled}
                    handleTextChange={handleTextChange}
                />
            }
            {type === 'text' &&
                <PlainTextInput
                    style={styles.inputField}
                    placeholder={placeholder}
                    isFilled={isFilled}
                    handleTextChange={handleTextChange}
                />
            }
        </View>
    )
}

const PasswordInput = ({ style, placeholder, isFilled, handleTextChange }) => {
    return (
        <View style={[styles.inputContainer, { borderColor: isFilled ? 'black' : '#BDBDBD' }]}>
            <TextInput
                style={style}
                placeholder={placeholder}
                placeholderTextColor={'#BDBDBD'}
                onChangeText={handleTextChange}
            />
        </View>
    )
}

const PlainTextInput = ({ style, placeholder, isFilled, handleTextChange }) => {
    return (
        <View style={[styles.inputContainer, { borderColor: isFilled ? '#000' : '#BDBDBD' }]}>
            <TextInput
                style={style}
                placeholder={placeholder}
                placeholderTextColor={'#BDBDBD'}
                onChangeText={handleTextChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    fieldContainer: {
        padding: 11,
    },

    inputContainer: {
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#BDBDBD',
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

