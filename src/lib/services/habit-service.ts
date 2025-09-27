// Client-side service functions for habit operations using axios
// To use this file, install axios: npm install axios

import axios from 'axios';
import type { Habit, CheckIn, ApiResponse } from '$lib/types/habit-types';
import { queryClient } from '$lib/query';

/**
 * Update a habit by ID
 * @param habitId - The ID of the habit to update
 * @param title - The new title for the habit
 * @param description - The new description for the habit
 * @returns Promise with the updated habit or error
 */
export async function updateHabit(habitId: string, title?: string, description?: string): Promise<ApiResponse<Habit>> {
  try {
    const response = await axios.put(`/api/habits/${habitId}`, {
      title,
      description
    });

    return {
      success: true,
      data: response.data.habit
    };
  } catch (error: any) {
    console.error('Error updating habit:', error);
    return {
      success: false,
      error: error.response?.data?.error || error.message || 'Failed to update habit'
    };
  }
}

/**
 * Delete a habit by ID
 * @param habitId - The ID of the habit to delete
 * @returns Promise with success status and message
 */
export async function deleteHabit(habitId: string): Promise<ApiResponse<void>> {
  try {
    const response = await axios.delete(`/api/habits/${habitId}`);

    return {
      success: true,
      message: response.data.message || 'Habit deleted successfully'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || error.message || 'Failed to delete habit'
    };
  }
}

/**
 * Check in a habit for the current date
 * @param habitId - The ID of the habit to check in
 * @param date - Optional date in YYYY-MM-DD format (defaults to today)
 * @returns Promise with the created check-in or error
 */
export async function checkInHabit(habitId: string, date?: string): Promise<ApiResponse<CheckIn>> {
  try {
    const response = await axios.post(`/api/habits/${habitId}/checkin`, {
      date
    });

    return {
      success: true,
      data: response.data.checkIn
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || error.message || 'Failed to check in habit'
    };
  }
}

/**
 * Delete a check-in for a specific date
 * @param habitId - The ID of the habit
 * @param date - Optional date in YYYY-MM-DD format (defaults to today)
 * @returns Promise with success status and message
 */
export async function deleteCheckIn(habitId: string, date?: string): Promise<ApiResponse<void>> {
  try {
    const response = await axios.delete(`/api/habits/${habitId}/checkin`, {
      data: { date }
    });

    return {
      success: true,
      message: response.data.message || 'Check-in removed successfully'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || error.message || 'Failed to uncheck habit'
    };
  }
}
