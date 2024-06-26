import { View, Text, Pressable, StyleSheet, TextInput, StyleProp, TextStyle } from 'react-native';
import React, { useRef, createRef, RefObject, useState } from 'react';
import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';

const Otp = () => {
  const inputs: RefObject<TextInput>[] = Array(6).fill(null).map(() => createRef<TextInput>());
  const [focusState, setFocusState] = useState(Array(6).fill(false));

  const handleOtpChange = (index: number, value: string) => {
    if (value.length === 1) {
      if (index < inputs.length - 1) {
        inputs[index + 1].current?.focus();
      }
    } else if (value.length === 0) {
      if (index > 0) {
        inputs[index - 1].current?.focus();
      }
    }
  };

  const handleKeyPress = (index: number, e: any) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      inputs[index - 1].current?.focus();
    }
  };

  const handleFocus = (index: number) => {
    const newFocusState = [...focusState];
    newFocusState[index] = true;
    setFocusState(newFocusState);
  };

  const handleBlur = (index: number) => {
    const newFocusState = [...focusState];
    newFocusState[index] = false;
    setFocusState(newFocusState);
  };

  return (
    <View style={styles.container}>
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
            style={[
              styles.input,
              focusState[index] && styles.inputFocused,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            selectionColor="#B24B3D" // Change to desired cursor color
            onChangeText={(value) => handleOtpChange(index, value)}
            onKeyPress={(e) => handleKeyPress(index, e)}
            onFocus={() => handleFocus(index)}
            onBlur={() => handleBlur(index)}
            returnKeyType="next"
            blurOnSubmit={false}
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
    width: 300,
    height: 300,
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
  inputFocused: {
    borderColor: '#B24B3D', // Change to desired focus color
    backgroundColor: '#F8F0CC', // Optional: change background color on focus
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
});

export default Otp;
