import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { auth, db } from '@/firebaseConfig'; // Import your Firebase configuration
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { router } from 'expo-router';
export default function Questions() {
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [country, setCountry] = useState('');
    const [user, setUser] = useState<FirebaseUser | null>(null); // Use Firebase User type

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setName(userData?.name || '');
                    setAge(userData?.age || '');
                    setBio(userData?.bio || '');
                    setCountry(userData?.country || '');
                }
                setUser(currentUser);
            }
        };
        fetchUser();
    }, []);

    const steps = [
        { question: 'What is your name?', value: name, setValue: setName },
        { question: 'Which country are you from?', value: country, setValue: setCountry },
        { question: 'What is your age?', value: age, setValue: setAge },
        { question: 'Tell us about yourself', value: bio, setValue: setBio },
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        }
    };

    const handleSubmit = async () => {
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                name,
                age,
                bio,
                country
            });
            router.push('/(tabs)')
        } else {
            Alert.alert("Error", "User not authenticated");
        }
    };

    return (
        <View style={styles.container}>
            <Animatable.View
                key={step}
                animation="slideInRight"
                duration={500}
                style={styles.inputContainer}
            >
                <Text style={styles.questionText}>{steps[step].question}</Text>
                <TextInput
                    style={styles.input}
                    value={steps[step].value}
                    onChangeText={steps[step].setValue}
                    placeholder={steps[step].question}
                    placeholderTextColor="#aaa"
                    returnKeyType="next"
                />
                {step < steps.length - 1 ? (
                    <TouchableOpacity onPress={handleNext} style={styles.button}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                )}
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
        color: '#000',
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
        backgroundColor: '#B24B3D',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: 150,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});
