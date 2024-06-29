import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubmitButton from '@/components/ui/SubmitButton';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const passwordInputRef = useRef<TextInput>(null);
    const router = useRouter();

    useEffect(() => {
        // display the user details, if he selected Remember Me before ;)
        const loadLoginDetails = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('email');
                const savedPassword = await AsyncStorage.getItem('password');
                const remember = await AsyncStorage.getItem('rememberMe');

                if (savedEmail && savedPassword && remember === 'true') {
                    setEmail(savedEmail);
                    setPassword(savedPassword);
                    setRememberMe(true);
                }
            } catch (error) {
                console.log('Error loading login details:', error);
            }
        };

        loadLoginDetails();
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const auth = getAuth(app);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (rememberMe) {
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('password', password);
                await AsyncStorage.setItem('rememberMe', 'true');
            } else {
                await AsyncStorage.removeItem('email');
                await AsyncStorage.removeItem('password');
                await AsyncStorage.setItem('rememberMe', 'false');
            }

            await user.reload();
            if (!user.emailVerified) {
                router.push('/(auth)/Otp');
                return;
            }

            router.push('/(tabs)');
        } catch (error) {
            Alert.alert('Error', 'Invalid email or password. Please try again.');
            console.log("Error logging in:", error);
        } finally {
            setLoading(false);
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
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
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
                ref={passwordInputRef}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
            />
            <View style={styles.rememberMeContainer}>
                <Pressable onPress={() => setRememberMe(!rememberMe)} style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && <Ionicons name="checkmark" style={styles.checkboxIcon} />}
                </Pressable>
                <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>
            <SubmitButton onPress={handleLogin} loading={loading} buttonText="Submit" />
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
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 4,
    },
    checkboxChecked: {
        backgroundColor: '#ff6347',
        borderColor: '#B24B3D',
    },
    checkboxIcon: {
        color: '#fff',
        fontSize: 18,
    },
    rememberMeText: {
        fontSize: 16,
    },
});
