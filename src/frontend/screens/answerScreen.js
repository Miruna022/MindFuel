import React, { useState } from 'react';
import {Text, StyleSheet, View} from "react-native";
import {AnswerButton} from "../components/AnswerButton";
import {BackButton} from "../components/BackButton";
import {NextButton} from "../components/NextButton";

export const AnswerScreen = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const questions = ['What teaching style would you prefer?']
    const answers = ['Clear structure', 'Make it engaging', 'Concise and to the point', 'Immersive, story driven']

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton/>
                <Text style={styles.title}> Choosing your AI teacher</Text>
            </View>
            <Text style={styles.counter}>Question 1/5</Text>
            <Text style={styles.questions}>{questions}</Text>
            {answers.map((answer, index) => (
                <AnswerButton
                    key={index}
                    label={answer}
                    isSelected={selectedAnswer === answer}
                    onPress={() => setSelectedAnswer(answer)}
                />
            ))}
            <View style={styles.answerss}></View>
            <NextButton/>
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