import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getHistory } from '../lib/parkingService';
import { ParkingSession } from '../types';

export default function HistoryScreen() {
  const { session } = useAuth();
  const [history, setHistory] = useState<ParkingSession[]>([]);

  useEffect(() => {
    if (session) {
      getHistory(session.user.id).then(({ data }) => {
        if (data) setHistory(data);
      });
    }
  }, [session]);

  const renderItem = ({ item }: { item: ParkingSession }) => {
    const date = new Date(item.start_time).toLocaleDateString();
    const cost = item.cost?.toFixed(2) || '0.00';

    return (
      <View style={styles.row}>
        <View>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.cost}>Cost: ${cost}</Text>
        </View>
        <TouchableOpacity style={styles.viewButton} onPress={() => {/* TODO: Navigate to map view */}}>
          <Text style={styles.viewText}>View in Maps</Text>
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
        ListEmptyComponent={<Text style={styles.emptyText}>No parking history available.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 15 },
  date: { fontSize: 16, fontWeight: '500' },
  cost: { fontSize: 14, color: '#555', marginTop: 2 },
  viewButton: { borderWidth: 1, borderColor: '#000', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5 },
  viewText: { fontSize: 14 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
});
