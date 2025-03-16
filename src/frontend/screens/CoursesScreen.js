import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    FlatList,
    ActivityIndicator,
    ScrollView, RefreshControl
} from "react-native";
import {auth, storage} from "../firebase/config";
import { ref, listAll, uploadBytes } from "firebase/storage";
import {useNavigation} from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

export const SectionsScreen = () => {
    const navigation = useNavigation();
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSectionName, setNewSectionName] = useState("");

    const userEmail = auth.currentUser?.email;

    const fetchSections = async () => {
        try {
            setLoading(true);
            const userStorageRef = ref(storage, `USER_DATA/${userEmail}/PDF_DATA`);
            const result = await listAll(userStorageRef);

            const sectionsSet = new Set();

            result.prefixes.forEach((folderRef) => {
                sectionsSet.add(folderRef.name);
            });

            setSections(Array.from(sectionsSet));
        } catch (error) {
            console.error("Error fetching sections:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSections();
    }, []);

    const createSection = async () => {
        if (!newSectionName.trim()) {
            Alert.alert("Error", "Section name cannot be empty.");
            return;
        }

        try {
            const sectionRef = ref(storage, `USER_DATA/${userEmail}/PDF_DATA/${newSectionName}/.placeholder.txt`);
            const dummyFile = new Blob(["placeholder title"], { type: "text/plain" });

            await uploadBytes(sectionRef, dummyFile);

            setNewSectionName("");
        } catch (error) {
            console.error("error creating section:", error);
            Alert.alert("Error", "Failed to create section.");
        }
        await fetchSections();
    };

    return (
        <View style = {styles.container}>
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
                                  <TouchableOpacity style={styles.folder} onPress={() => navigation.navigate("Section", { sectionName: item })}>
                                      <Text style={styles.text}>{item}</Text>
                                  </TouchableOpacity>
                              )}
                    />
                </View>
            ) : (
                <Text>No sections found.</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Enter section name"
                value={newSectionName}
                onChangeText={setNewSectionName}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => createSection()}>
                <AntDesign name="pluscircle" size={64} color="black" />
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
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },

    text: {
        fontSize: 18,
        fontFamily: "Inter-SemiBold",
        textAlign: "center",
    },
    input: {
        marginTop: 40,
        borderRadius: 8,
        borderWidth: 2,
        paddingHorizontal: 50,
    }
});
