import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { router } from 'expo-router';

export default function Questions() {
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [country, setCountry] = useState('');
    const [user, setUser] = useState<FirebaseUser | null>(null);

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
        { question: 'What is your name?', value: name, setValue: setName, image: require('@/assets/images/profileMaker/NAME.png') },
        { question: 'Which country are you from?', value: country, setValue: setCountry, image: require('@/assets/images/profileMaker/COUNTRY.png') },
        { question: 'What is your age?', value: age, setValue: setAge, image: require('@/assets/images/profileMaker/AGE.png') },
        { question: 'Tell us about yourself', value: bio, setValue: setBio, image: require('@/assets/images/profileMaker/BIO.png') },
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        }
    };

    const handleSubmit = async () => {
        if (user) {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const existingData = userDoc.data();
            const existingReviews = existingData?.reviews || [];

            await setDoc(doc(db, "users", user.uid), {
                name,
                age,
                bio,
                country,
                reviews: existingReviews,
            }, { merge: true });
            
            setStep(0);
            router.push('/(tabs)');
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
                <View style={styles.imageContainer}>
                    <Image source={steps[step].image} style={styles.image} />
                </View>
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
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                )}
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9fafc',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 30,
    },
    imageContainer: {
        width: 350,
        height: 350,
        borderRadius: 350,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 350,
        height: 350,
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
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: '#f1f1f1',
    },
    button: {
        width: '100%',
        backgroundColor: '#B24B3D',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});
