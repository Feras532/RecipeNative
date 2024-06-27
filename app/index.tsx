import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, ScrollView } from 'react-native';
import AnimatedCoverImage from "@/components/login/AnimatedCoverImage";
import Login from '@/components/login/login';
import Signup from '@/components/login/signup';

export default function Index() {
    const [activeButton, setActiveButton] = useState('LOGIN');

    const handlePress = (button: string) => {
        setActiveButton(button);
    };

    return (
        <ScrollView style={styles.container}>
            <AnimatedCoverImage />
            <View style={styles.containerLoginSignup}>
                <View style={styles.loginSignup}>
                    <Pressable onPress={() => handlePress('LOGIN')} style={[styles.button, activeButton === 'LOGIN' && styles.activeButton]}>
                        <Text style={[styles.btnText, activeButton === 'LOGIN' && styles.activeBtnText]}>LOGIN</Text>
                    </Pressable>
                    <Pressable onPress={() => handlePress('SIGNUP')} style={[styles.button, activeButton === 'SIGNUP' && styles.activeButton]}>
                        <Text style={[styles.btnText, activeButton === 'SIGNUP' && styles.activeBtnText]}>SIGNUP</Text>
                    </Pressable>
                </View>
                {activeButton === 'LOGIN' ? <Login /> : <Signup />}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    containerLoginSignup: {
        backgroundColor: '#fff',
        height: "100%",
        borderRadius: 30,
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
});
