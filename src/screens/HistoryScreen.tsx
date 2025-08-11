import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { ParkingSession } from '../types';

export default function HistoryScreen() {
  const { session } = useAuth();
  const [history, setHistory] = useState<ParkingSession[]>([]);

  useEffect(() => {
    setHistory([
      {
        id: 1,
        user_id: '1',
        start_time: '2024-06-26T10:00:00Z',
        end_time: '2024-06-26T11:10:00Z',
        duration_seconds: 70 * 60, // 1 hr 10 mins
        cost: 5.5,
        start_lat: 37.7749,
        start_lng: -122.4194,
      },
      {
        id: 2,
        user_id: '1',
        start_time: '2024-06-20T14:00:00Z',
        end_time: '2024-06-20T14:45:00Z',
        duration_seconds: 45 * 60, // 45 mins
        cost: 3.25,
        start_lat: 37.7749,
        start_lng: -122.4194,
      },
      {
        id: 3,
        user_id: '1',
        start_time: '2024-06-10T14:00:00Z',
        end_time: '2024-06-10T16:00:00Z',
        duration_seconds: 120 * 60, // 2 hrs
        cost: 9.0,
        start_lat: 40.7128, 
        start_lng: -74.0060,
      },
    ]);
  }, [session]);

  const renderItem = ({ item }: { item: ParkingSession }) => {
    const date = new Date(item.start_time).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    const durationMinutes = Math.floor(item.duration_seconds / 60);
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const durationText = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;

    return (
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.duration}>Duration {durationText}</Text>
        </View>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => {
            Alert.alert('Not yet implemented', 'Map view feature is coming soon!');
          }}
        >
          <Text style={styles.viewText}>View in Map</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No parking history available.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 20 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  info: { flexDirection: 'column' },
  date: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  duration: { fontSize: 14, color: '#555' },
  viewButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  viewText: { fontSize: 14, color: '#007AFF' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
});
