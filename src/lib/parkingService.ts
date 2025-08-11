import { supabase } from './supabase';

export async function saveParkingSpot(userId: string, lat: number, lng: number) {
  return await supabase.from('saved_spots').insert([{ user_id: userId, lat, lng }]);
}

export async function getHistory(userId: string) {
  return await supabase.from('parking_sessions').select('*').eq('user_id', userId).order('start_time', { ascending: false });
}