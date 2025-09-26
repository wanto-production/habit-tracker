// src/routes/auth/+page.server.ts
import { auth } from '$lib/auth';
import { redirect, fail, type Actions } from '@sveltejs/kit';
import { BetterAuthError } from 'better-auth';

export const actions: Actions = {
  login: async ({ request }) => {
    const form = await request.formData();
    const email = form.get('email')?.toString() || '';
    const password = form.get('password')?.toString() || '';

    if (!email || !password) {
      return fail(400, { loginError: 'Email and password are required' });
    }

    try {
      // ⚠️ JANGAN gunakan asResponse: true di server
      await auth.api.signInEmail({
        body: { email, password }
      });

      // Jika berhasil, redirect
      throw redirect(303, '/dashboard');
    } catch (error) {
      if (error instanceof BetterAuthError) {
        return fail(400, { loginError: error.message });
      }
      return fail(500, { loginError: 'An unexpected error occurred' });
    }
  },

  register: async ({ request }) => {
    const form = await request.formData();
    const name = form.get('name')?.toString() || '';
    const email = form.get('email')?.toString() || '';
    const password = form.get('password')?.toString() || '';
    const confirmPassword = form.get('confirmPassword')?.toString() || '';

    // Validasi dasar
    if (!name || !email || !password) {
      return fail(400, { registerError: 'All fields are required' });
    }
    if (password !== confirmPassword) {
      return fail(400, { registerError: 'Passwords do not match' });
    }

    try {
      await auth.api.signUpEmail({
        body: { name, email, password }
      });

      throw redirect(303, '/dashboard');
    } catch (error) {
      if (error instanceof BetterAuthError) {
        // Lebih aman: jangan tampilkan error mentah ke user
        return fail(400, { registerError: 'Failed to create account. Please try again.' });
      }
      return fail(500, { registerError: 'An unexpected error occurred' });
    }
  }
};
