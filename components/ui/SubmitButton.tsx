import React from 'react';
import { Pressable, StyleSheet, ActivityIndicator, View } from 'react-native';
import CustomText from './CustomText';
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
                <CustomText style={styles.submitButtonText}>{buttonText}</CustomText>
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
        elevation: 3,
        marginTop: 5,
        width: '100%'
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default SubmitButton;
