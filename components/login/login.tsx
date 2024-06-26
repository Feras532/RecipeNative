import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebaseConfig";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handleLogin = async () => {
        try {
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/(tabs)');
        } catch (error) {
            Alert.alert('Error', 'Invalid email or password. Please try again.');
            console.log("Error logging in:", error);
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
            <Pressable style={styles.submitButton} onPress={handleLogin}>
                <Text style={styles.submitButtonText}>Submit</Text>
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
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
