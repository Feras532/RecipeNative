import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { router } from 'expo-router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app,auth } from "@/firebaseConfig";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            console.log("pass doesnt match");
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            console.log("Trying to getAuth");
            const auth = getAuth(app);
            console.log("Got the auth");
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("completed signup");
            router.push('/(auth)/Otp')
        } catch (error) {
            Alert.alert('Error',);
            console.log("Error sigh.", error);
        }
    };

    return (
        <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
                <Ionicons name='mail' style={styles.icon} />
                <Text style={styles.label}>Email</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Example@Lazywait.com"
                placeholderTextColor="#888"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <View style={styles.inputWrapper}>
                <Ionicons name='key' style={styles.icon} />
                <Text style={styles.label}>Password</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="*******"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <View style={styles.inputWrapper}>
                <Ionicons name='key' style={styles.icon} />
                <Text style={styles.label}>Confirm Password</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="*******"
                placeholderTextColor="#888"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Pressable onPress={handleSignup}>
                <View style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        padding: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    icon: {
        fontSize: 24,
        color: '#ff6347',
        marginRight: 10,
    },
    label: {
        fontSize: 20,
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        fontSize: 18,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 2,
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
    },
    submitButtonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
