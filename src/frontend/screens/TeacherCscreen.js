import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export const TeacherCscreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require("../assets/C.png")} style={styles.background} />
            <Text style={styles.title}>You have matched with...</Text>
            <Image source={require("../assets/profC.png")} style={styles.professorImage} />

            <View style={styles.card}>
                <Text style={styles.cardTitle}>The Direct Professor</Text>
                <Text style={styles.cardText}>• Straight to the point, no sugar coating</Text>
                <Text style={styles.cardText}>• Fast and highly efficient learning</Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Start studying</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    background: {
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    title: {
        fontSize: 34,
        fontFamily: "Inter-Bold",
        marginTop: 45,
        textAlign: "center",
    },
    professorImage: {
        width: 270,
        height: 270,
    },
    card: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 29,
        borderWidth: 3,
        marginBottom: 30,
        width: "90%",
    },
    cardTitle: {
        fontSize: 26,
        fontFamily: "Inter-SemiBold",
        marginBottom: 10,
        textAlign: "center",
    },
    cardText: {
        fontSize: 20,
        fontFamily: "Inter-Regular",
        textAlign: "left",
    },
    button: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 5,
        width: "90%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontFamily: "Inter-Medium",
        fontSize: 22,
    },
});
