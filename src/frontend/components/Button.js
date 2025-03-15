import { View, StyleSheet, Text } from 'react-native';

export const Button = ({ text }) => {
    return (
        <View style={styles.button}>
            <Text>{text}</Text>
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
            color: '#000',
            alignSelf: 'center',
            alignItems: 'center',
            width: '100%',
        },

        buttonText: {
            fontWeight: 'bold',
            fontSize: 20,
        }
    }
)