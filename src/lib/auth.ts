import { supabase } from './supabase';

export async function signIn(email: string, password: string) {
  const response = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  console.log('signIn response:', response);
  return response;
}

export async function signUp(email: string, password: string) {
  const response = await supabase.auth.signUp({
    email: email.trim(),
    password,
  });
  console.log('signUp response:', response);
  return response;
}