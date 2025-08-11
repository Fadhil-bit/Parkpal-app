export type ParkingSession = {
  id: number;
  user_id: string;
  start_time: string;
  end_time: string;
  start_lat: number;
  start_lng: number;
  cost: number;
  duration_seconds: number;
};
