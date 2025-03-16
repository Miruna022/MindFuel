import React, { useEffect, useState } from "react";
import {View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { auth, storage } from "../firebase/config";
import {ref, listAll, getDownloadURL, uploadBytes, getStorage} from "firebase/storage";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

export const SectionDetailsScreen = ({route}) => {
    const sectionName = route.params.sectionName;

    const userEmail = "demo@live.com";
    const [sections, setSections] = useState([]);
    const [audiosBySection, setAudiosBySection] = useState({});
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const [sound, setSound] = useState(null);
    const [pdfUploadedSuccessfully, setPdfUploadedSuccessfully] = useState(false);
    const [pdfID, setPdfID] = useState(null);

    useEffect(() => {
        const fetchSectionsAndAudios = async () => {
            try {

                const userStorageRef = ref(storage, `USER_DATA/${userEmail}/PDF_DATA/${sectionName}`);
                const resultSections = await listAll(userStorageRef);
                const sectionNames = resultSections.prefixes.map((folderRef) => folderRef.name);

                setSections(sectionNames);

                let audioData = {};

                for (const section of sectionNames) {

                    let sectionAudios = [];

                    let audioStorageRef = ref(storage, `USER_DATA/${userEmail}/PDF_DATA/${sectionName}/${section}/AUDIO/`);
                    let result = await listAll(audioStorageRef);

                    let audioFiles = await Promise.all(
                        result.items.map(async (audioRef) => {
                            const url = await getDownloadURL(audioRef);
                            return { name: audioRef.name, url };
                        })
                    );

                    sectionAudios.push(...audioFiles);

                    audioData[section] = sectionAudios;
                }

                setAudiosBySection(audioData);
            } catch (error) {
                console.error("Error fetching sections and audio files:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSectionsAndAudios();
    }, []);

    const toggleAudio = async (url) => {
        if (currentPlaying === url) {
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
                setSound(null);
                setCurrentPlaying(null);
            }
        } else {
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
                setCurrentPlaying(null);
            }

            const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
            setSound(newSound);
            setCurrentPlaying(url);
            await newSound.playAsync()
        }
    };
    const turnAudioOff = () => {
        setIsPlaying(true);
        setCurrentPlaying(null);
    }
    const getFileBlob = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };

    const addPDF = async (pdfFileUri, filepath) => {
        const storage = getStorage();
        const pathReference = ref(storage, filepath);

        try {
            const fileBlob = await getFileBlob(pdfFileUri);

            await uploadBytes(pathReference, fileBlob);
            console.log("PDF file uploaded successfully:", filepath);
            setPdfUploadedSuccessfully(true);
        } catch (error) {
            console.error("Error when uploading PDF file:", error);
        }
    };

    async function handleFileUpload() {

        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
            }).then(async (response) => {
                if (response.canceled) {
                    return;
                }

                const { uri, name, size } = response.assets[0];

                const user = "demo@live.com"
                if (!user) {
                    Alert.alert("Error", "User is not authenticated");
                    return;
                }
                const userEmail = auth.currentUser?.email;
                setPdfID(`pdf-${Math.floor(Math.random() * 1000000)}`)
                const filePath = `USER_DATA/${userEmail}/PDF_DATA/${sectionName}/pdf-${pdfID}/raw.pdf`;
                await addPDF(uri, filePath);
            });
        } catch (err) {
            console.error("error:", err);
        }
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"model": "gemma3"})
    };
    const sendRequest = async (userEmail, section, pdfID) => {
        try {
            await fetch(
                `http://192.168.62.214:8000/generate/${userEmail}/${sectionName}/${section}/${pdfID}/`, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            console.log(data)
                            Alert.alert("test: ",
                                data.createdAt);

                        });
                })
        }
        catch (error) {
            console.log("aiicaa")
            console.error(error);
        }



    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : sections.length > 0 ? (
                <FlatList
                    data={sections}
                    keyExtractor={(section) => section}
                    renderItem={({ item: section }) => (
                        <View>
                            <Text style={styles.header}>{section}</Text>
                            {audiosBySection[section]?.length > 0 ? (
                                audiosBySection[section].map((audio) => (
                                <TouchableOpacity
                                    key={audio.name}
                                    style={styles.audioItem}
                                    onPress={() => {!isPlaying ? (toggleAudio(audio.url)) : turnAudioOff()}}
                                >
                                    <Text style={styles.item}>{audio.name}</Text>
                                    <FontAwesome
                                        name={currentPlaying === audio.url ? "pause-circle" : "play-circle"}
                                        size={24}
                                        color="black"
                                        style={{ marginLeft: 10 }}
                                    />
                                </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={styles.empty}>No audios in this section.</Text>
                            )}
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.empty}>No sections found.</Text>
            )}
            <TouchableOpacity onPress={handleFileUpload} style={[styles.button]}>
                <FontAwesome name="file" size={20} color={"#FFD1C1"} />
                <Text>Upload file</Text>
            </TouchableOpacity>
            {
                pdfUploadedSuccessfully ? (
                    Alert.alert('Error', "error when uploading PDF file.")
                ) : (
                    sendRequest(userEmail, section, pdfID);
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#EAE2F3",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 15,
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    item: {
        fontSize: 18,
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        textAlign: "center",
    },
    empty: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
    },
    audioItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 10,
        backgroundColor: "#C3B1E1",
        marginVertical: 5,
        borderRadius: 8,
    },
});

export default SectionDetailsScreen;
