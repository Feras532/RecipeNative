import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';

interface SubmitButtonProps {
    onPress: () => void;
    loading: boolean;
    buttonText: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, loading, buttonText }) => {
    return (
        <Pressable onPress={onPress} style={styles.submitButton}>
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={styles.submitButtonText}>{buttonText}</Text>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: '#B24B3D',
        borderRadius: 10,
        padding: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        elevation: 3,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SubmitButton;
