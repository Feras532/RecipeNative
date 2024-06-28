import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import { getAuth, sendEmailVerification } from "firebase/auth";
import { app } from "@/firebaseConfig";

const Otp = () => {
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const router = useRouter();
    const { email } = useLocalSearchParams();

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const verifyEmail = async () => {
        try {
            const auth = getAuth(app);
            const user = auth.currentUser;

            if (user) {
                await user.reload();

                if (user.emailVerified) {
                    router.push('/profileMaker/profileMaker');
                } else {
                    Alert.alert('Error', '❌ Email not verified. Please check your email and try again.');
                }
            }
        } catch (error) {
            Alert.alert('Error', '❌ An error occurred. Please try again.');
            console.log("Error verifying email:", error);
        }
    };

    const resendVerificationEmail = async () => {
        try {
            const auth = getAuth(app);
            const user = auth.currentUser;

            if (user) {
                await sendEmailVerification(user);
                setTimer(60);
                setCanResend(false);
                Alert.alert('Success', '✅ Verification email resent! Please check your email.');
            }
        } catch (error) {
            Alert.alert('Error', '❌ An error occurred while resending the email. Please try again.');
            console.log("Error resending email:", error);
        }
    };

    return (
        <View style={styles.container}>
            <LottieView
                source={require('@/assets/animations/otp.json')}
                autoPlay
                loop
                style={styles.animation}
            />
            <Text style={styles.instructionText}>Please check your email to verify your account.</Text>
            <Text style={({color: "#000"})}>{email}</Text>

            <Pressable style={styles.submitButton} onPress={verifyEmail}>
                <Text style={styles.submitButtonText}>Proceed</Text>
            </Pressable>

            {canResend ? (
                <Pressable onPress={resendVerificationEmail}>
                    <Text style={styles.resendLink}>Resend Verification Email</Text>
                </Pressable>
            ) : (
                <Text style={styles.timerText}>You can resend the email in {timer} seconds.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    animation: {
        width: 400,
        height: 400,
    },
    instructionText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
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
    resendLink: {
        marginTop: 20,
        fontSize: 16,
        color: '#ff6347',
        textDecorationLine: 'underline',
    },
    timerText: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});

export default Otp;
