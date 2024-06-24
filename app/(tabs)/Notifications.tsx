import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const notifications = [
  { id: '1', title: 'Notification 1', description: 'This is the first notification', open: false, date: "6/23/2024" },
  { id: '2', title: 'Notification 2', description: 'This is the second notification', open: true , date: "6/23/2024"},
  { id: '3', title: 'Notification 3', description: 'This is the third notification', open: false, date: "6/23/2024" },
  { id: '4', title: 'Notification 4', description: 'This is the fourth notification', open: true , date: "6/23/2024"},
  { id: '5', title: 'Notification 5', description: 'This is the fifth notification', open: false , date: "6/23/2024"},
];

export default function Notifications() {
  const unopenNotifications = notifications.filter(n => !n.open);
  const openNotifications = notifications.filter(n => n.open);

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <View style={styles.container}>
        <Text style={styles.header}>New Notifications 📬</Text>
        <FlatList
          data={unopenNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.description}>{item.date}</Text>
            </View>
          )}
        />
        <Text style={styles.header}>Viewed Notifications 📭</Text>
        <FlatList
          data={openNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.description}>{item.date}</Text>
            </View>
          )}
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
    textAlign: 'left',
  },
  notificationCard: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
