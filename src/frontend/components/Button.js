import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

// onPress should be a mandatory prop
export const Button = ({ text, style = null, buttonStyle = null, onPress=null }) => {
    return (
        <View style={[style, {width: '100%'}]}>
            <TouchableOpacity
                style={[styles.button, buttonStyle]}
                onPress={onPress}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>
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