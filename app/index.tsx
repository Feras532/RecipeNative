import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, Image, Animated, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';

export default function Login() {
    const [activeButton, setActiveButton] = useState('LOGIN');
    const animatedValue = new Animated.Value(0);

    const handlePress = (button: any) => {
        setActiveButton(button);
    };

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require("../assets/images/cover.png")}
                style={[styles.animatedImage, {
                    transform: [{
                        translateY: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -100],
                        }),
                    }],
                }]}
            />
            <View style={styles.containerLoginSignup}>
                <View style={styles.loginSignup}>
                    <Pressable onPress={() => handlePress('LOGIN')} style={[styles.button, activeButton === 'LOGIN' && styles.activeButton]}>
                        <Text style={[styles.btnText, activeButton === 'LOGIN' && styles.activeBtnText]}>LOGIN</Text>
                    </Pressable>
                    <Pressable onPress={() => handlePress('SIGNUP')} style={[styles.button, activeButton === 'SIGNUP' && styles.activeButton]}>
                        <Text style={[styles.btnText, activeButton === 'SIGNUP' && styles.activeBtnText]}>SIGNUP</Text>
                    </Pressable>
                </View>
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
                    <Link href={"/(tabs)"}style={styles.submitButton}>
                        <Pressable >
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    animatedImage: {
        height: 400,
        width: '100%',
        alignItems: 'center',
        overflow: 'visible',
    },
    containerLoginSignup: {
        backgroundColor: '#fff',
        height: "100%",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        marginRight: 5,
        marginLeft: 5,
        elevation: 10,
    },
    loginSignup: {
        flexDirection: 'row',
        height: 60,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        overflow: 'hidden',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    activeButton: {
        backgroundColor: '#B24B3D',
    },
    btnText: {
        fontSize: 24,
    },
    activeBtnText: {
        color: '#ffff',
        fontWeight: 'bold',

    },
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
        color: '#B24B3D',
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
