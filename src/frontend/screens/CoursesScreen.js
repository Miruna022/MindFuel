import React, { useState, useEffect } from "react";
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, FlatList, ActivityIndicator} from "react-native";
import {auth, storage} from "../firebase/config";
import { ref, listAll } from "firebase/storage";
import {useNavigation} from '@react-navigation/native';


export const SectionsScreen = () => {
    const navigation = useNavigation();
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    // const userEmail = auth.currentUser?.email
    const userEmail = "demo@live.com";
    useEffect(() => {
        const fetchSections = async () => {
            try {
                const userStorageRef = ref(storage, `USER_DATA/${userEmail}/PDF_DATA`);
                const result = await listAll(userStorageRef);

                const pdfIdsSet = new Set();

                result.prefixes.forEach((folderRef) => {
                    pdfIdsSet.add(folderRef.name);
                });

                setSections(Array.from(pdfIdsSet));
            } catch (error) {
                console.error("Error fetching sections:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSections();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Courses</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : sections.length > 0 ? (
                <View style={styles.folderContainer}>
                    <FlatList
                              data={sections}
                              keyExtractor={(item) => item}
                              numColumns={2}
                              renderItem={({ item }) => (
                                  <TouchableOpacity style={styles.folder} onPress={() => navigation.navigate("Section", { pdfId: item })}>
                                      <Text style={styles.text}>{item}</Text>
                                  </TouchableOpacity>
                              )}
                    />
                </View>
            ) : (
                <Text>No sections found.</Text>
            )}
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAE2F3",
        padding: 20,
        alignItems: "center",
    },
    header: {
        textAlign: "center",
        fontSize: 32,
        fontFamily: "Inter-Bold",
        paddingTop: 50,
        marginBottom: 30,
    },
    folderContainer: {
        flexWrap: "wrap",
        width: "100%",
        marginBottom: 8,
    },
    folder: {
        padding: 10,
        width: 150,
        height: 100,
        backgroundColor: "#C3B1E1",
        marginHorizontal: 7,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        marginBottom: 12,
    },
    addButton: {
        backgroundColor: "#ADADAD",
        width: 80,
        height: 80,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold"
    },
    text: {
        fontSize: 18,
        fontFamily: "Inter-SemiBold",
        textAlign: "center",
    }
});
