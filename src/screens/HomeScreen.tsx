import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useAuth } from '../context/AuthContext';
import { saveParkingSpot } from '../lib/parkingService';

export default function HomeScreen() {
  const { session } = useAuth();

  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleSaveSpot = async () => {
    if (!session?.user.id) {
      Alert.alert('Error', 'User not logged in');
      return;
    }
    try {
      await saveParkingSpot(session.user.id, region.latitude, region.longitude);
      Alert.alert('Success', 'Parking spot saved!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save parking spot');
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        <Marker coordinate={region} />
      </MapView>

      {/* Bottom Panel */}
      <View style={styles.panel}>
        <TouchableOpacity style={styles.button} onPress={handleSaveSpot}>
          <Text style={styles.buttonText}>Save My Parking Spot</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Navigate', 'Not implemented yet')}>
          <Text style={styles.buttonText}>Navigate To My Parking Spot</Text>
        </TouchableOpacity>

        <View style={styles.sessionRow}>
          <Text>Current Session</Text>
          <Text>2:15 PM</Text>
        </View>
        <View style={styles.sessionRow}>
          <Text>Starter</Text>
          <Text>1:20</Text>
        </View>
        <TouchableOpacity style={styles.endButton} onPress={() => Alert.alert('End Session', 'Not implemented yet')}>
          <Text style={styles.endText}>End Parking Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  panel: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  sessionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  endButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 6,
  },
  endText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});