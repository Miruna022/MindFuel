import React from "react";
import {View, StyleSheet, Modal, Text} from "react-native";
import {Video} from "expo-av";

const LoadVidScreen = () => {

    return (
        <Modal
            style={styles.container}
            transparent={false}
            animationType={'fade'}>
            <Video
                source={require("../assets/logoload.mp4")}
                style={styles.video}
                resizeMode="contain"
                shouldPlay
                isLooping
                rate={2.0}
            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        alignSelf: "center",
        alignContent: "center",
        verticalAlign: "center",
        justifyContent: "center",
        textAlign: "center",
        textAlignVertical: "center",
    },
    video: {
        flex: 1,
        alignItems: "center",
        alignSelf: "center",
        alignContent: "center",
        verticalAlign: "center",
        justifyContent: "center",
        textAlign: "center",
        textAlignVertical: "center",

        width: 200,
        height: 200,
    },

    text: {
        fontFamily: "Inter-Bold",
        fontSize: 24,
    }
});

export default LoadVidScreen;
