import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const TeacherBscreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require("../assets/B.png")} style={styles.background} />
            <Text style={styles.title}>You have matched with...</Text>
            <Image source={require("../assets/profB.png")} style={styles.professorImage} />

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Mentor Professor</Text>
                <Text style={styles.cardText}>• Calm and structured guidance</Text>
                <Text style={styles.cardText}>• Professional and balanced teaching style</Text>
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
        backgroundColor: "#000", // fallback color
    },
    background: {
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#000",
        textAlign: "center",
    },
    professorImage: {
        width: 270,
        height: 270,
        marginBottom: 8,
    },
    card: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        borderWidth: 2,
        marginBottom: 30,
        width: "90%",
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    cardText: {
        fontSize: 22,
        textAlign: "left",
    },
    button: {
        backgroundColor: "black",
        padding: 20,
        borderRadius: 5,
        width: "60%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },
});

export default TeacherBscreen;
