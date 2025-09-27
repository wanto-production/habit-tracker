import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { checkIns, habits } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import * as v from 'valibot';

// Define the schema for checking in habits
const checkInHabitSchema = v.object({
  date: v.optional(v.pipe(v.string(), v.regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'))),
});

export const POST: RequestHandler = async ({ params, request, locals }) => {
  const { user } = locals;

  // Check if user is authenticated
  if (!user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const habitId = params.id;
  if (!habitId) {
    return json({ error: 'Habit ID is required' }, { status: 400 });
  }

  try {
    // Validate the request body
    const body = await request.json();
    const validatedData = v.parse(checkInHabitSchema, body);

    // Check if the habit exists and belongs to the user
    const existingHabits = await db.select()
      .from(habits)
      .where(and(eq(habits.id, habitId), eq(habits.userId, user.id)))
      .limit(1);

    if (existingHabits.length === 0) {
      return json({ error: 'Habit not found' }, { status: 404 });
    }

    // Determine the date for the check-in (today by default if not provided)
    const checkInDate = validatedData.date || new Date().toISOString().split('T')[0];

    // Check if a check-in already exists for this date
    const existingCheckIn = await db.select()
      .from(checkIns)
      .where(and(
        eq(checkIns.habitId, habitId),
        eq(checkIns.date, checkInDate)
      ))
      .limit(1);

    if (existingCheckIn.length > 0) {
      return json({ error: 'Habit already checked in for this date' }, { status: 409 });
    }

    // Create the check-in
    const [newCheckIn] = await db.insert(checkIns)
      .values({
        id: crypto.randomUUID(),
        habitId: habitId,
        date: checkInDate,
      })
      .returning();

    return json({ success: true, checkIn: newCheckIn });
  } catch (error) {
    console.error('Error checking in habit:', error);

    if (error && typeof error === 'object' && 'issues' in error) {
      // Valibot validation error
      return json({ error: 'Invalid data', details: error }, { status: 400 });
    }

    return json({ error: 'Failed to check in habit' }, { status: 500 });
  }
};

// Endpoint to delete a check-in (uncheck) for a specific date
export const DELETE: RequestHandler = async ({ params, request, locals }) => {
  const { user } = locals;

  // Check if user is authenticated
  if (!user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const habitId = params.id;
  if (!habitId) {
    return json({ error: 'Habit ID is required' }, { status: 400 });
  }

  try {
    // Parse the date from the request body
    const body = await request.json();
    const validatedData = v.parse(checkInHabitSchema, body);

    // Check if the habit exists and belongs to the user
    const existingHabits = await db.select()
      .from(habits)
      .where(and(eq(habits.id, habitId), eq(habits.userId, user.id)))
      .limit(1);

    if (existingHabits.length === 0) {
      return json({ error: 'Habit not found' }, { status: 404 });
    }

    // Determine the date for the check-in (today by default if not provided)
    const checkInDate = validatedData.date || new Date().toISOString().split('T')[0];

    // Delete the check-in for the specified date
    await db.delete(checkIns)
      .where(and(
        eq(checkIns.habitId, habitId),
        eq(checkIns.date, checkInDate)
      ));

    return json({ success: true, message: 'Check-in removed successfully' });
  } catch (error) {
    console.error('Error unchecking habit:', error);

    if (error && typeof error === 'object' && 'issues' in error) {
      // Valibot validation error
      return json({ error: 'Invalid data', details: error }, { status: 400 });
    }

    return json({ error: 'Failed to uncheck habit' }, { status: 500 });
  }
};
