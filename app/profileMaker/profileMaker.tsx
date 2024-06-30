import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function ProfileMaker() {


    return (
        <View style={styles.container}>
            <Text style={styles.instructionText}>Hey welcome to </Text>
            <Text style={styles.appName}>RecipeNative </Text>
            <LottieView
                source={require('@/assets/animations/cooking.json')}
                autoPlay
                loop
                style={styles.animation}
            />
            <Pressable style={styles.submitButton}>
                <Link href={'/profileMaker/questions'}>
                    <Text style={styles.submitButtonText}>Cook my profile</Text>
                </Link>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    animation: {
        width: 400,
        height: 400,
    },
    instructionText: {
        fontSize: 22,
        textAlign: 'center',
        color: '#777',
        fontWeight: '600',
    },
    appName: {
        fontSize: 38,
        textAlign: 'center',
        color: '#444',
        fontWeight: '600',

    },
    inputContainer: {
        width: '90%',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 30,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    questionText: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#3a86ff',
        fontWeight: '700',
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 25,
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: '#f1f1f1',
    },
    button: {
        backgroundColor: '#3a86ff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#B24B3D',
        borderRadius: 10,
        padding: 15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        elevation: 2,
        paddingHorizontal: 80,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
