import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import React, { useRef, createRef, RefObject } from 'react';
import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';

const Otp = () => {
  const inputs: RefObject<TextInput>[] = Array(6).fill(null).map(() => createRef<TextInput>());

  const handleOtpChange = (index: number, value: string) => {
    if (value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].current?.focus();
    }
    // handle the OTP value change here if needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Otp</Text>
      <LottieView
        source={require('@/assets/animations/otp.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.instructionText}>Please check your E-mail to enter the code.</Text>

      <View style={styles.inputsContainer}>
        {inputs.map((input, index) => (
          <TextInput
            key={index}
            ref={input}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(value) => handleOtpChange(index, value)}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              if (index < inputs.length - 1) {
                inputs[index + 1].current?.focus();
              }
            }}
          />
        ))}
      </View>

      <Pressable style={styles.submitButton}>
        <Link href={"/(tabs)"} style={styles.submitButtonText}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Link>
      </Pressable>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  animation: {
    width: 200,
    height: 200,
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Otp;
