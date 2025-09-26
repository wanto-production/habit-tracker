import { createAuthClient } from "better-auth/svelte";
import type { auth } from "./auth.ts";
import {
  inferAdditionalFields,
  usernameClient,
  magicLinkClient,
} from "better-auth/client/plugins";
import { invalidate } from "$app/navigation";

export const authClient = createAuthClient({
  baseURL: import.meta.env.BETTER_AUTH_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    usernameClient(),
    magicLinkClient(),
  ],
});

export const logout = () => {
  authClient.signOut()
  invalidate('auth:load')
}
