import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet} from "react-native";
import {auth, storage} from "../firebase/config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { Audio } from "expo-av";

export const SectionDetailsScreen = ({ route }) => {
    const { pdfId } = route.params;
    const [audios, setAudios] = useState([]);
    const [loading, setLoading] = useState(true);
    // const userEmail = auth.currentUser?.email
    const userEmail = "demo@live.com";

    useEffect(() => {
        const fetchAudios = async () => {
            try {
                const audioStorageRef = ref(storage, `USER_DATA/${userEmail}/PDF_DATA/${pdfId}/pdf-1/AUDIO`);
                const result = await listAll(audioStorageRef);

                const audioFiles = await Promise.all(
                    result.items.map(async (audioRef) => {
                        const url = await getDownloadURL(audioRef);
                        return { name: audioRef.name, url };
                    })
                );

                setAudios(audioFiles);
            } catch (error) {
                console.error("error fetching audio files:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAudios();
    }, [pdfId]);

    const playAudio = async (url) => {
        try {
            const { sound } = await Audio.Sound.createAsync({ uri: url });
            await sound.playAsync();
        } catch (error) {
            console.error("error playing audio:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{pdfId}</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : audios.length > 0 ? (
                <FlatList
                    data={audios}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <Text style={styles.item} onPress={() => playAudio(item.url)}>{item.name}</Text>
                    )}
                />
            ) : (
                <View style={styles.fix}>
                    <Text style={styles.empty}>No audios, upload a PDF...</Text>
                </View>
            )}
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
        textAlign: "left",
        fontSize: 25,
        fontFamily: "Inter-Bold",
        paddingTop: 50,
        marginBottom: 30,
        paddingBottom: 10,
        borderBottomWidth: 1,
    },
    fix: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "65%",
    },
    empty: {
        fontSize: 16,
        textAlign: "center",
    },
    item: {
        fontSize: 18,
        padding: 15,
        backgroundColor: "#C3B1E1",
        marginVertical: 5,
        borderRadius: 8,
        fontFamily: "Inter-SemiBold",
    },
})
