import React, { useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';

const AnimatedCoverImage = () => {
    const animatedValue = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.Image
            source={require("../../assets/images/cover.png")}
            style={[
                styles.animatedImage,
                {
                    transform: [{
                        translateY: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-100, 0],
                        }),
                    }],
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    animatedImage: {
        height: 400,
        width: '100%',
        alignItems: 'center',
        overflow: 'visible',
    },
});

export default AnimatedCoverImage;
