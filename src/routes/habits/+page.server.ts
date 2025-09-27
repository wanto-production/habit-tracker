import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { habits } from '$lib/server/db/schema';
import { habitsSchema } from '$lib/schema';
import { valibot, type Infer } from "sveltekit-superforms/adapters"
import { superValidate, message } from 'sveltekit-superforms/server'

export const load = async () => {
  const form = await superValidate<Infer<typeof habitsSchema>>(valibot(habitsSchema));
  return { form };
}

export const actions: Actions = {
  default: async (event) => {
    const { user } = event.locals
    const form = await superValidate<Infer<typeof habitsSchema>>(event, valibot(habitsSchema))

    if (!form.valid) return fail(400, { form });

    try {
      // Create the habit in the database
      await db.insert(habits).values({
        id: crypto.randomUUID(),
        userId: user.id,
        title: form.data.title,
        description: form.data.description || null,
      });

      // Redirect to dashboard after successful creation
      throw redirect(303, '/dashboard');
    } catch (error) {
      console.error('Error creating habit:', error);
      return message(form, { error: 'Failed to create habit' });
    }
  }
};
