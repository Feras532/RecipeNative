import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={focused ? "#B24B3D" : "#888888"} />
              {focused && <View style={styles.underline} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          title: 'likes',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
              <TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={focused ? "#B24B3D" : "#888888"} />
              {focused && <View style={styles.underline} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={focused ? "#B24B3D" : "#888888"} />
              {focused && <View style={styles.underline} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  focusedIconContainer: {
    borderRadius: 20,
  },
  underline: {
    position: 'absolute',
    top: -2,
    width: '50%',
    height: 3,
    backgroundColor: '#B24B3D',
    borderRadius: 1.5,
  },
});