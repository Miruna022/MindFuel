import React, { useEffect, useState } from "react";
import {View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Image} from "react-native";
import { auth, storage } from "../firebase/config";
import {ref, listAll, getDownloadURL, uploadBytes, getStorage} from "firebase/storage";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import * as DocumentPicker from "expo-document-picker";
import {useNavigation} from "@react-navigation/native";
import LoadVidScreen from "./LoadVidScreen"

export const SectionDetailsScreen = ({route}) => {
    const sectionName = route.params.sectionName;
    const navigation = useNavigation();

    const userEmail = auth.currentUser?.email;

    const [sections, setSections] = useState([]);
    const [audiosBySection, setAudiosBySection] = useState({});
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const [sound, setSound] = useState(null);
    const [pdfUploadedSuccessfully, setPdfUploadedSuccessfully] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [audioDurations, setAudioDurations] = useState({});

    useEffect(() => {
        const fetchAudioDuration = async (url) => {
            try {
                const { sound } = await Audio.Sound.createAsync({ uri: url });
                const status = await sound.getStatusAsync();
                await sound.unloadAsync();
                return status.isLoaded ? status.durationMillis : 0;
            } catch (error) {
                console.error("Error fetching audio duration:", error);
                return 0;
            }
        };

        const fetchSectionsAndAudios = async () => {
            try {

                const userStorageRef = ref(storage, `USER_DATA/${userEmail}/PDF_DATA/${sectionName}`);
                const resultSections = await listAll(userStorageRef);
                const sectionNames = resultSections.prefixes.map((folderRef) => folderRef.name);

                setSections(sectionNames);

                let audioData = {};
                let durations = {};

                for (const section of sectionNames) {
                    console.log(section)
                    let sectionAudios = [];

                    let audioStorageRef = ref(storage, `USER_DATA/${userEmail}/PDF_DATA/${sectionName}/${section.replace(".pdf", "")}/AUDIO/`);
                    let result = await listAll(audioStorageRef);

                    let audioFiles = await Promise.all(
                        result.items.map(async (audioRef) => {
                            const url = await getDownloadURL(audioRef);
                            const duration = await fetchAudioDuration(url); // Fetch duration
                            durations[url] = duration;
                            return {name: audioRef.name, url};
                        })
                    );

                    sectionAudios.push(...audioFiles);
                    audioData[section] = sectionAudios;
                }

                setAudiosBySection(audioData);
                setAudioDurations(durations);
            } catch (error) {
                console.error("Error fetching sections and audio files:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSectionsAndAudios();
    }, []);

    const formatTime = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = Math.floor((millis % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const toggleAudio = async (url) => {
        await Audio.setAudioModeAsync({
            staysActiveInBackground: true,  // Allow background playback
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
        });

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

            const {sound: newSound} = await Audio.Sound.createAsync({uri: url});
            setSound(newSound);
            setCurrentPlaying(url);
            await newSound.playAsync()

            newSound.setOnPlaybackStatusUpdate(async (status) => {
                if (status.isLoaded && status.isPlaying) {
                    setCurrentTime(status.positionMillis);
                    setTotalDuration(status.durationMillis || totalDuration);
                }
            });
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
            Alert.alert("PDF upload", "Document uploaded successfully!");
        } catch (error) {
            console.error("Error when uploading PDF file:", error);
        }
    };

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"model": "gemma3"})
    };

    const sendRequest = async (userEmail, section, pdfID) => {
        try {
            await fetch(
                `http://192.168.62.214:8000/generate/${userEmail}/${sectionName}/${section}/${pdfID.replace(".pdf", "")}/`, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            if (data.code.includes("202")) {
                                Alert.alert("Podcasts","Podcasts generated successfully!");
                                return;
                            } else if (data.code.includes("500")) {
                                Alert.alert("Podcasts","Something went wrong, please try again!");
                                return;
                            } else if (data.code.includes("404")) {
                                Alert.alert("Podcasts","Document contains illegal content! Please try again with another document!");
                                return;
                            }
                        });
                })
        } catch (error) {
            console.log("error when sending request:", error);
            console.error(error);
        }
    }

    async function handleFileUpload() {

        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
            }).then(async (response) => {
                if (response.canceled) {
                    return;
                }

                const {uri, name, size} = response.assets[0];

                let pdfID = `pdf-${Math.floor(Math.random() * 1000000)}`
                const filePath = `USER_DATA/${userEmail}/PDF_DATA/${sectionName}/${name.replace(" ", "-").replace(".pdf", "")}/raw.pdf`;
                await addPDF(uri, filePath);
                await sendRequest(userEmail, sectionName, pdfID);

            });
        } catch (err) {
            console.error("error:", err);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center"}}>
                <TouchableOpacity style={styles.press} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/left.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerSection}>{sectionName}</Text>
            </View>
            {loading ? (
                <LoadVidScreen/>
            ) : sections.length > 0 ? (
                <>

                    <FlatList
                        data={sections}
                        keyExtractor={(section) => section}
                        renderItem={({ item: section, index }) => (
                            <View style = {{paddingBottom: 60}}>

                                {<Text style={styles.header}>{section.replace(".pdf", "")}</Text>}

                                {audiosBySection[section]?.length > 0 ? (
                                    audiosBySection[section].map((audio) => (
                                        <TouchableOpacity
                                            key={audio.name}
                                            style={styles.audioItem}
                                            onPress={() => { !isPlaying ? toggleAudio(audio.url) : turnAudioOff() }}
                                        >

                                            <Text style={styles.audioText}>{audio.name}</Text>

                                            <View style={styles.audioControls}>
                                                <Text style={styles.timeText}>
                                                    {currentPlaying === audio.url
                                                        ? `${formatTime(currentTime)} / ${formatTime(audioDurations[audio.url] || 0)}`
                                                        : `0:00 / ${formatTime(audioDurations[audio.url] || 0)}`}
                                                </Text>
                                                <FontAwesome
                                                    name={currentPlaying === audio.url ? "pause-circle" : "play-circle"}
                                                    size={28}
                                                    color="black"
                                                    style={styles.playButton}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text style={styles.empty}>No audios in this section.</Text>
                                )}
                            </View>
                        )}
                    />
                </>
            ) : (
                <Text style={styles.empty}>No sections found.</Text>
            )}

            {/* Upload Button */}
            <TouchableOpacity onPress={handleFileUpload} style={[styles.uploadButton]}>
                <AntDesign name="upload" size={24} color="black" />
                <Text style={styles.buttonText}>Upload file</Text>
            </TouchableOpacity>
        </View>
    );


}

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
        paddingBottom: 5,
        borderBottomWidth: 1
    },
    headerSection: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 15,
        //paddingBottom: 5,
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
        padding: 10,
        backgroundColor: "#C3B1E1",
        marginVertical: 5,
        borderRadius: 8,
    },
    audioText: {
        flex: 1/1.05,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
    },
    audioControls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end", // Align play button and time together
    },
    timeText: {
        fontSize: 16,
        marginRight: 10,
        color: "#333",
    },
    playButton: {
        marginLeft: 5,
    },
    uploadButton: {
        position: "absolute",
        bottom: 20,
        left: "45%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFD1C1",
        flexDirection: "row",
        borderRadius: 8,
        margin: 10,
        padding: 10,
        textAlign: "center",
        transform: [{ translateX: -50 }],

    },
    buttonText: {
        fontSize: 20,
        marginLeft: 10,

    },
    backIcon: {
        width: 35,
        height: 35,
    },
    press: {

    }
});
