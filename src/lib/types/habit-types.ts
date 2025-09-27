
export interface Habit {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: Date;
}

export interface CheckIn {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
