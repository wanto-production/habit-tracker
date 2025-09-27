import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { habits } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import * as v from 'valibot';

// Define the schema for updating habits
const updateHabitSchema = v.object({
  title: v.optional(v.pipe(v.string(), v.minLength(1, 'Title is required'), v.maxLength(100, 'Title must be less than 100 characters'))),
  description: v.optional(v.pipe(v.string(), v.maxLength(500, 'Description must be less than 500 characters'))),
});

export const PUT: RequestHandler = async ({ params, request, locals }) => {
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
    const validatedData = v.parse(updateHabitSchema, body);

    // Check if the habit exists and belongs to the user
    const existingHabits = await db.select()
      .from(habits)
      .where(eq(habits.id, habitId))
      .limit(1);

    if (existingHabits.length === 0) {
      return json({ error: 'Habit not found' }, { status: 404 });
    }

    const existingHabit = existingHabits[0];
    if (existingHabit.userId !== user.id) {
      return json({ error: 'Not authorized to update this habit' }, { status: 403 });
    }

    // Update the habit
    const [updatedHabit] = await db.update(habits)
      .set({
        title: 'title' in validatedData && validatedData.title !== undefined ? validatedData.title : existingHabit.title,
        description: 'description' in validatedData ? validatedData.description || null : existingHabit.description,
      })
      .where(eq(habits.id, habitId))
      .returning();

    return json({ success: true, habit: updatedHabit });
  } catch (error) {
    console.error('Error updating habit:', error);
    
    if (error && typeof error === 'object' && 'issues' in error) {
      // Valibot validation error
      return json({ error: 'Invalid data', details: error }, { status: 400 });
    }
    
    return json({ error: 'Failed to update habit' }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
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
    // Check if the habit exists and belongs to the user
    const existingHabits = await db.select()
      .from(habits)
      .where(eq(habits.id, habitId))
      .limit(1);

    if (existingHabits.length === 0) {
      return json({ error: 'Habit not found' }, { status: 404 });
    }

    const existingHabit = existingHabits[0];
    if (existingHabit.userId !== user.id) {
      return json({ error: 'Not authorized to delete this habit' }, { status: 403 });
    }

    // Delete the habit (this will also delete related check-ins due to cascade)
    await db.delete(habits)
      .where(eq(habits.id, habitId));

    return json({ success: true, message: 'Habit deleted successfully' });
  } catch (error) {
    console.error('Error deleting habit:', error);
    return json({ error: 'Failed to delete habit' }, { status: 500 });
  }
};