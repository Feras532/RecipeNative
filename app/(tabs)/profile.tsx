import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const dummyProfileData = {
  name: 'Feras Alferas',
  email: 'Feras.Alsinan@lazywait.com',
  bio: 'Software Engineer with a passion for mobile development and design.',
};

export default function Profile() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >
      <View style={styles.container}>   
        <Text style={styles.header}>Profile</Text>
        <Image
          source={require("../../assets/images/man.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{dummyProfileData.name}</Text>
        <Text style={styles.email}>{dummyProfileData.email}</Text>
        <Text style={styles.bio}>{dummyProfileData.bio}</Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  bio: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
  },
});
