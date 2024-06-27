import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const [profileData, setProfileData] = useState<any>({ name: '', age: '', bio: '', country: '' });
  useEffect(() => {
    const fetchProfileData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        }
      }
    };
    fetchProfileData();
  }, []);

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/images/man.png')} style={styles.profileImage} />
        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.age}>{profileData.age}</Text>
        <Text style={styles.bio}>{profileData.bio}</Text>
        <Text style={styles.location}>{profileData.country}</Text>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 26,
    alignItems: 'center',
  },
  profileImage: {
    width: 212,
    height: 250,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  age: {
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
  location: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
  },
});
