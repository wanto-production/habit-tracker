import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./server/db";
import { username, magicLink } from "better-auth/plugins";
import { betterAuth } from "better-auth";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  appName: "habit-tracker",
  plugins: [
    magicLink({
      sendMagicLink({ email, token, url }, request) {
        // Send email with magic link
      },
    }),
    username(),
    sveltekitCookies(getRequestEvent),
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  }
});
