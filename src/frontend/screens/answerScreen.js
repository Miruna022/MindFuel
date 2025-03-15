import React, { useState } from 'react';
import {Text, StyleSheet, View, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnswerButton} from "../components/AnswerButton";
import {BackButton} from "../components/BackButton";
import {NextButton} from "../components/NextButton";

export const AnswerScreen = () => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [indexQ, setIndexQ] = useState(0);
    const questions = [
        'What teaching style would you prefer?',
        'What tone would suit you better?',
        'What pace would you like?'
    ];
    const answers = [
        ['Clear structure', 'Make it engaging', 'Concise and to the point', 'Immersive, story driven'],
        ['Friendly, energetic', 'Calm, professional', 'Casual, humorous', 'Deep, thoughtful'],
        ['Slow and detailed', 'Medium speed', 'Fast paced, efficient', 'Adjustable']
    ];
    const handleNext = () => {
        if (indexQ < 2) {
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
    const handleAnswers = (answer) => {
        setSelectedAnswers((prev) => ({ ...prev, [indexQ]: answer, }));
    };
    const handleSave = async () => {
        try {
            await AsyncStorage.setItem("answers", JSON.stringify(selectedAnswers));
            Alert.alert("Finished!", "Your answer has been saved!");
        } catch (error) {
            console.error("Error saving answers: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton onPress={handleBack}/>
                <Text style={styles.title}> Choosing your AI teacher</Text>
            </View>
            <Text style={styles.counter}>Question {indexQ + 1}/3</Text>
            <Text style={styles.questions}>{questions[indexQ]}</Text>
            {answers[indexQ].map((answer, index) => (
                <AnswerButton
                    key={index}
                    label={answer}
                    isSelected={selectedAnswers[indexQ] === answer}
                    onPress={() => handleAnswers(answer)}
                />
            ))}
            <View style={styles.answerss}></View>
            <NextButton isLast={indexQ === 2} onPress={indexQ === 2 ? handleSave : handleNext}/>
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