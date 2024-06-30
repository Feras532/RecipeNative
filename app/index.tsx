import React, { useState } from 'react';
import { Pressable, View, StyleSheet, ScrollView } from 'react-native';
import AnimatedCoverImage from "@/components/login/AnimatedCoverImage";
import Login from '@/components/login/login';
import Signup from '@/components/login/signup';
import CustomText from '@/components/ui/CustomText';
export default function Index() {
    const [activeButton, setActiveButton] = useState('LOGIN');

    const handlePress = (button: string) => {
        setActiveButton(button);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <AnimatedCoverImage />
            <View style={styles.containerLoginSignup}>
                <View style={styles.loginSignup}>
                    <Pressable onPress={() => handlePress('LOGIN')} style={[styles.button, activeButton === 'LOGIN' && styles.activeButton]}>
                        <CustomText style={[styles.btnText, activeButton === 'LOGIN' && styles.activeBtnText]}>LOGIN</CustomText>
                    </Pressable>
                    <Pressable onPress={() => handlePress('SIGNUP')} style={[styles.button, activeButton === 'SIGNUP' && styles.activeButton]}>
                        <CustomText style={[styles.btnText, activeButton === 'SIGNUP' && styles.activeBtnText]}>SIGNUP</CustomText>
                    </Pressable>
                </View>
                {activeButton === 'LOGIN' ? <Login /> : <Signup />}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#f0f0f0',
    },
    containerLoginSignup: {
        backgroundColor: '#fff',
        borderRadius: 30,
        marginHorizontal: 5,
        elevation: 10,
        flexGrow: 1,
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
        backgroundColor: '#fafafa',
    },
    activeButton: {
        backgroundColor: '#B24B3D',
    },
    btnText: {
        fontSize: 24,
        fontFamily: 'Kanit-Regular'
    },
    activeBtnText: {
        color: '#fff',
    },
});