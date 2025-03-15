import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CourseFolder = ({ title, color, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.folder, { backgroundColor: color }]}
                onPress={onPress}
            />
            <Text style={styles.folderText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 20,
        marginInline: 7,
    },
    folder: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderRadius: 13,
    },
    folderText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
});

export default CourseFolder;
