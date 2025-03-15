import {View, StyleSheet, Text, Image} from 'react-native';

export const LogoBanner = () => {
    return (
        <View style={styles.banner}>
            <Image source={require('../assets/logo_splash_icon.webp')} style={styles.logoImage}/>
            <Text style={styles.logoText}>MindFuel</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    banner: {
        width: '60%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 10,
        padding: 10,
    },

    logoImage: {
        width: 58,
        height: 58,
    },

    logoText: {
        fontFamily: 'Inter-Bold',
        fontSize: 32,
    }
})