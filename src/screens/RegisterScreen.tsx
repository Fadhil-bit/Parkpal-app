import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, CommonActions, CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { signUp, signIn } from '../lib/auth';
import { useAuth } from '../context/AuthContext';

type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Settings: undefined;
};
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: { screen: keyof MainTabParamList } | undefined;
  Contact: undefined;
};
type RegisterScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'Register'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { session } = useAuth();

  useEffect(() => {
    // When session exists, reset navigation to MainTabs
    if (session) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainTabs', params: { screen: 'Home' } }],
        })
      );
    }
  }, [session, navigation]);

  const handleRegister = async () => {
    // Example shortcut to directly go to Home on specific creds
    if (email.trim() === 'fadhilndam2@gmail.com' && password === 'woukouo237') {
      // You could sign in or just simulate login
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainTabs', params: { screen: 'Home' } }],
        })
      );
      return;
    }

    try {
      const { error: signUpError } = await signUp(email.trim(), password);
      if (signUpError) {
        Alert.alert('Registration Error', signUpError.message);
        return;
      }

      const { error: signInError } = await signIn(email.trim(), password);
      if (signInError) {
        Alert.alert('Login Error', signInError.message);
        return;
      }

      Alert.alert('Success', 'Account created and logged in!');
      // Navigation will happen via useEffect on session update
    } catch (err) {
      Alert.alert('Registration Error', 'Unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Create Your Account</Text>

      <Text>Email Address</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
        <Text style={styles.signUpText}>Sign up</Text>
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
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
  },
  signUpButton: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 6,
  },
  signUpText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});