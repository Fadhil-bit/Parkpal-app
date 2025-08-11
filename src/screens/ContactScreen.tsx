import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const { session } = useAuth();

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    try {
      const { error } = await supabase.from('feedback').insert([
        {
          user_id: session?.user.id || null,
          name,
          email,
          message: description,
        },
      ]);
      if (error) throw error;
      Alert.alert('Success', 'Thank you for your feedback!');
      setName('');
      setEmail('');
      setDescription('');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit feedback.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text>Email ID:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <Text>Description:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backArrow: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 6,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
