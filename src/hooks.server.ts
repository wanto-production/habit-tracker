import { auth } from "$lib/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
  // Fetch current session from Better Auth
  const session = await auth.api.getSession({
    headers: event.request.headers,
  });

  // Make session and user available on server
  if (session) {
    event.locals.session = session.session;
    event.locals.user = session.user;
  }

  if (["/dashboard"].includes(event.url.pathname) && !session?.user) {
    throw redirect(303, '/auth')
  }

  if (["/auth"].includes(event.url.pathname) && session?.user) {
    throw redirect(303, '/dashboard')
  }

  return svelteKitHandler({ event, resolve, auth, building })
}
