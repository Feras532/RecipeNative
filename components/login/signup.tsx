import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';

export default function Signup() {
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
            />
            <Pressable>
                <Link href={"/(tabs)"} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </Link>
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
