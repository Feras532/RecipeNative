import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from "firebase/auth";
import { app } from "@/firebaseConfig";
import SubmitButton from '@/components/ui/SubmitButton';
import CustomText from '../ui/CustomText';
export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const passwordInputRef = useRef<TextInput>(null);
    const confirmPasswordInputRef = useRef<TextInput>(null);
    const router = useRouter();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            const auth = getAuth(app);
            console.log('Checking email:', email);
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            console.log('Sign-in methods:', signInMethods);

            if (signInMethods.length > 0) {
                Alert.alert('Error', 'Email already in use');
                return;
            }

            console.log('Creating user with email:', email);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Sending email verification to:', user.email);
            await sendEmailVerification(user);
            console.log('Email sent to:', user.email);
            router.push({ pathname: '/(auth)/Otp', params: { email } });
        } catch (error: any) {
            let errorMessage = 'An error occurred. Please try again.';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'The email address is already in use by another account.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'The email address is not valid.';
            } else if (error.code === 'auth/operation-not-allowed') {
                errorMessage = 'Email/password accounts are not enabled.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'The password is too weak.';
            }
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
                <Ionicons name='mail' style={styles.icon} />
                <CustomText style={styles.label}>Email</CustomText>
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
                <CustomText style={styles.label}>Password</CustomText>
            </View>
            <TextInput
                style={styles.input}
                placeholder="*******"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                ref={passwordInputRef}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />
            <View style={styles.inputWrapper}>
                <Ionicons name='key' style={styles.icon} />
                <CustomText style={styles.label}>Confirm Password</CustomText>
            </View>
            <TextInput
                style={styles.input}
                placeholder="*******"
                placeholderTextColor="#888"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                ref={confirmPasswordInputRef}
                returnKeyType="done"
                onSubmitEditing={handleSignup}
            />
            <SubmitButton onPress={handleSignup} loading={loading} buttonText="Submit" />
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
});
