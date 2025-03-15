import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const LectureCard = ({ name, progress, duration, color }) => {
    const [pressed, setPressed] = useState(false);

    return (
        <TouchableOpacity
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            style={[
                styles.card,
                {
                    backgroundColor: pressed
                        ? lightenColor(color)
                        : color, // shows when it is pressed
                },
            ]}
        >
            <View>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.progress}>{progress}% listened</Text>
            </View>
            <Text style={styles.duration}>{duration}</Text>
        </TouchableOpacity>
    );
};

// the effects on pressing a button
const lightenColor = (color) => {
    let colorInt = parseInt(color.replace("#", ""), 16);
    colorInt = Math.min(colorInt + 0x111111, 0xFFFFFF);
    return `#${colorInt.toString(16).padStart(6, "0")}`;
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        width: 300,
        marginTop: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    progress: {
        fontSize: 12,
        color: "#555",
    },
    duration: {
        fontSize: 14,
        fontWeight: "bold",
        backgroundColor: "#f5f5f5",
        padding: 5,
        borderRadius: 5,
    },
});

export default LectureCard;
