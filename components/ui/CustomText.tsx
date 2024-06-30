import React from 'react';
import { Text, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
    children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({ style, ...props }) => {
    return <Text {...props} style={[{ fontFamily: 'Kanit-Regular' }, style]} />;
};

export default CustomText;
