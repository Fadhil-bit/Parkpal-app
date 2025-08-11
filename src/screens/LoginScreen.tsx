import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signIn } from '../lib/auth';
import { useAuth } from '../context/AuthContext';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { session } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Navigate to Home when session exists
  useEffect(() => {
    if (session) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainTabs', params: { screen: 'Home' } }],
        })
      );
    }
  }, [session, navigation]);

  const handleSignIn = async () => {
    try {
      const { data, error } = await signIn(email.trim(), password);
      if (error || !data.session) {
        Alert.alert('Login Failed', error?.message || 'Invalid credentials');
        return;
      }
      // session update triggers navigation in useEffect
    } catch {
      Alert.alert('Login Failed', 'Unexpected error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ParkPal</Text>
      <Text style={styles.subtitle}>Find. Save. Return</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Social and Register buttons unchanged */}
      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => Alert.alert('Google Sign-In', 'Not implemented yet')}
      >
        <Text style={styles.socialText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => Alert.alert('Apple Sign-In', 'Not implemented yet')}
      >
        <Text style={styles.socialText}>Sign in with Apple</Text>
      </TouchableOpacity>

      <Text style={styles.registerPrompt}>Don't have an account?</Text>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 36, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginVertical: 8 },
  signInButton: { marginTop: 10, backgroundColor: '#000', paddingVertical: 12, borderRadius: 6, width: '100%', marginBottom: 20 },
  signInText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  socialButton: { flexDirection: 'row', alignItems: 'center', borderColor: '#ccc', borderWidth: 1, borderRadius: 6, paddingVertical: 10, paddingHorizontal: 20, width: '100%', marginBottom: 15 },
  socialText: { fontSize: 16 },
  registerPrompt: { fontSize: 16, marginTop: 30, color: '#333' },
  registerButton: { marginTop: 10, backgroundColor: '#000', paddingVertical: 12, borderRadius: 6, width: '100%' },
  registerText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});