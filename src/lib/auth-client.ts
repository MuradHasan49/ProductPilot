import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' 
    ? window.location.origin + "/api/auth" 
    : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api") + "/auth",
});

export const { signIn, signUp, signOut, useSession } = authClient;
