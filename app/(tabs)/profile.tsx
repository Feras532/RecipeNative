import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, ScrollView, TouchableOpacity, Pressable, Share, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from 'expo-router';
import CustomText from '@/components/ui/CustomText';
export default function Profile() {
  const [profileData, setProfileData] = useState<any>({ name: '', email: '', age: '', bio: '', country: '' });

  const currentUser = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        }
      }
    };
    fetchProfileData();
  }, []);

  const handleEditProfile = () => {
    router.push('/profileMaker/profileMaker');
  };

  const handleLogOut = () => {
    router.push('/');
  };

  const handleInviteFriend = async () => {
    try {
      await Share.share({
        message: 'Check out this awesome RecipeNative app! Link:LOREM ',
      });
    } catch (error) {
      console.error('Error sharing content: ', error);
    }
  };

  const handleRateApp = () => {
    const url = Platform.OS === 'ios'
      ? 'https://www.apple.com/sa/app-store'
      : 'https://play.google.com/store/games?hl=en';
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileImageContainer}>
          <Image source={require('../../assets/images/man.png')} style={styles.profileImage} />
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="pencil-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <CustomText style={styles.name}>{profileData.name}</CustomText>
        <CustomText style={styles.email}>{currentUser?.email}</CustomText>
        <View style={styles.infoContainer}>
          <Ionicons name="person-outline" size={24} color="#666" style={styles.infoIcon} />
          <CustomText style={styles.infoValue}>{profileData.age} years</CustomText>
        </View>
        <View style={styles.infoContainer}>
          <Ionicons name="location-outline" size={24} color="#666" style={styles.infoIcon} />
          <CustomText style={styles.infoValue}>{profileData.country}</CustomText>
        </View>
        <View style={styles.infoContainer}>
          <Ionicons name="information-circle-outline" size={24} color="#666" style={styles.infoIcon} />
          <CustomText style={styles.infoValue}>{profileData.bio}</CustomText>
        </View>
        <Pressable onPress={handleInviteFriend} style={({ pressed }) => [styles.infoContainer, pressed && styles.pressedContainer]}>
          <Ionicons name="person-add-outline" size={24} color="#666" style={styles.infoIcon} />
          <CustomText style={styles.infoValue}>Invite a Friend</CustomText>
        </Pressable>
        <Pressable onPress={handleRateApp} style={({ pressed }) => [styles.infoContainer, pressed && styles.pressedContainer]}>
          <Ionicons name="star-outline" size={24} color="#666" style={styles.infoIcon} />
          <CustomText style={styles.infoValue}>Rate the Application</CustomText>
        </Pressable>
        <TouchableOpacity onPress={handleLogOut} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <CustomText style={styles.logoutButtonText}>Logout</CustomText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    paddingVertical: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginTop: 40,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#fff',
    borderWidth: 3,
    backgroundColor: '#E6E6E6',
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#B24B3D',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 26,
    color: '#333',
    marginVertical: 10,
  },
  email: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  pressedContainer: {
    backgroundColor: '#E8E8E8',
  },
  infoIcon: {
    marginRight: 10,
  },
  infoValue: {
    fontSize: 18,
    color: '#666',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B24B3D',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginVertical: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});
