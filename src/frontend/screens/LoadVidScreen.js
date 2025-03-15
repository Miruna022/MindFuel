import React from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";

const LoadVidScreen = () => {
    return (
        <View style={styles.container}>
            <Video
                source={require("../assets/logoload.mp4")}
                style={styles.video}
                resizeMode="contain"
                shouldPlay
                isLooping
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    video: {
        width: 250,
        height: 250,
    },
});

export default LoadVidScreen;
