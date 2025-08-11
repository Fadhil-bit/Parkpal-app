import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define your RootStackParamList here or import from your navigation/types file
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  Contact: undefined;
};

export default function SettingsScreen() {
  const [distance, setDistance] = useState(3);

  // Type your navigation prop here
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileButton}>
        <Text style={styles.profileText}>Profile Details</Text>
      </TouchableOpacity>

      <Text style={styles.filterLabel}>Filter to nearest parking spot</Text>

      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={distance}
        onValueChange={setDistance}
      />
      <Text style={styles.distanceValue}>{distance} km</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
        <Text style={styles.contactLink}>Contact us</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  profileButton: { backgroundColor: '#eee', padding: 15, borderRadius: 6, marginBottom: 20 },
  profileText: { fontSize: 16 },
  filterLabel: { marginBottom: 5 },
  distanceValue: { marginTop: 5, marginBottom: 20, fontSize: 16, textAlign: 'center' },
  contactLink: { color: 'blue', fontSize: 16, marginTop: 20 },
});
