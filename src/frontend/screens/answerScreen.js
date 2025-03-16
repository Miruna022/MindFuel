import React, { useState } from 'react';
import {Text, StyleSheet, View, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnswerButton} from "../components/AnswerButton";
import {BackButton} from "../components/BackButton";
import {NextButton} from "../components/NextButton";
import {useNavigation} from '@react-navigation/native';
import {getStorage, ref, uploadBytes} from "firebase/storage";
import { auth } from "../firebase/config";

export const AnswerScreen = () => {
    const navigation = useNavigation();
    const userEmail = auth.currentUser?.email;
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [indexQ, setIndexQ] = useState(0);
    const [preferenceCount, setPreferenceCount] = useState({});
    const questions = [
        'What teaching style would you prefer?',
        'What tone would suit you better?',
        'What pace would you like?',
        'How should the teacher keep you engaged?',
        'How often should the teacher make reviews?'
    ];
    const answers = [
        ['Clear, organized structure', 'Make it engaging', 'Concise and to the point', 'Immersive, story driven'],
        ['Friendly, energetic', 'Calm, professional', 'Casual, humorous', 'Deep, thoughtful'],
        ['Slow and detailed', 'Medium speed', 'Fast paced, efficient', 'Adjustable'],
        ['By adding humour and personality', 'By using dramatic story telling', 'By keeping things direct and efficient', 'By relating things to real-world applications'],
        ['Frequent recaps', 'Summary at the end of each lesson', 'Occasional takeaways', 'No repetition']
    ];
    const preferenceLetters = [
        ['B'], ['A', 'B', 'D'], ['C'], ['A', 'D'],
        ['A','D'], ['B','C'], ['A','D'], ['C'],
        ['A','B'], ['A','B','D'], ['C'], ['D'],
        ['A','D'], ['A'], ['B','C'], ['B', 'D'],
        ['A'], ['A', 'B', 'D'], ['B','C','D'], ['C']
    ];
    const isNextDisabled =selectedAnswers[indexQ] === undefined;

    const handleNext = () => {
        if (indexQ < 4) {
            setIndexQ(indexQ + 1);
        } else {
            Alert.alert("No more questions", `${JSON.stringify(selectedAnswers)}`);
        }
    };

    const handleBack = () => {
        if (indexQ > 0) {
            setIndexQ(indexQ - 1);
        } else {
            Alert.alert("Nothing past this point");
        }
    };

    const handleAnswers = (indexA) => {
        const selectedAnswer = answers[indexQ][indexA];
        setSelectedAnswers((prev) => ({ ...prev, [indexQ]: selectedAnswer }));
        const letters = preferenceLetters[indexA];
        if (letters) {
            letters.forEach((letter) => {
                setPreferenceCount((prev) => ({ ...prev, [letter]: (prev[letter] || 0) + 1 }));
            })
        }
    };
    const addJSON = async (jsonData, filepath) => {
        const storage = getStorage();
        const pathReference = ref(storage, filepath);

        try {

            const fileBlob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });

            await uploadBytes(pathReference, fileBlob);
            console.log("JSON file uploaded successfully:", filepath);
        } catch (error) {
            console.error("Error when uploading JSON file:", error);
        }
    };

    const handleSave = async () => {
        try {

            await AsyncStorage.setItem('userAnswers', JSON.stringify(selectedAnswers));
            await AsyncStorage.setItem('userPreference', JSON.stringify(preferenceLetters));


            const maxCount = Math.max(...Object.values(preferenceCount));
            const maxLetters = Object.entries(preferenceCount)
                .filter(([letter, count]) => count === maxCount)
                .map(([letter]) => letter);

            const finalLetter = maxLetters.length > 1 ? prioritize(maxLetters) : maxLetters;
            const chosen = finalLetter[0];

            let teacher;

            if (chosen.length === 1) {
                if (chosen === 'A') {
                    navigation.navigate('TeacherA');
                    teacher = "Story";
                } else if (chosen === 'B') {
                    navigation.navigate('TeacherB');
                    teacher = "Mentor";
                } else if (chosen === 'C') {
                    navigation.navigate('TeacherC');
                    teacher = "Direct";
                } else if (chosen === 'D') {
                    navigation.navigate('TeacherD');
                    teacher = "Friendly";
                }
            }


            const jsonData = {
                teacher,
            };

            const filePath = `USER_DATA/${userEmail}/SETTINGS/preferences.json`;
            await addJSON(jsonData, filePath);

        } catch (error) {
            console.error("Error saving answers: ", error);
        }
    };

    const prioritize = (maxLetters) => {
        const QPriority = [0, 1, 4];
        let prioritizedLetters = [...maxLetters];

        QPriority.forEach((qIndex) => {
            const selectedAnswer = selectedAnswers[qIndex];
            if (selectedAnswer) {
                const letterPriority = preferenceLetters[answers[qIndex].indexOf(selectedAnswer)];
                letterPriority.forEach((letter) => {
                    if (maxLetters.includes(letter) && !prioritizedLetters.includes(letter)) {
                        prioritizedLetters.unshift(letter);
                    }
                });
            }
        });
        return prioritizedLetters;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton onPress={handleBack}/>
                <Text style={styles.title}> Choosing your AI teacher</Text>
            </View>
            <Text style={styles.counter}>Question {indexQ + 1}/5</Text>
            <Text style={styles.questions}>{questions[indexQ]}</Text>
            {answers[indexQ].map((answer, index) => (
                <AnswerButton
                    key={index}
                    label={answer}
                    isSelected={selectedAnswers[indexQ] === answer}
                    onPress={() => handleAnswers(index)}
                />
            ))}

            <View style={styles.answerss}></View>
            <NextButton isLast={indexQ === 4} onPress={indexQ === 4 ? handleSave : handleNext} disabled = {isNextDisabled}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAE2F3',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
    },
    questions: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 30,
        paddingTop: 10,
    },
    counter: {
        fontSize: 16,
        right: 100,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 50,
        right: 10,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
    },
    answerss: {
        marginBottom: 45,
    }
});