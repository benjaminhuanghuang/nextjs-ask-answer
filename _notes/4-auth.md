# Auth

## Routes

(auth)/sign-in
(auth)/sign-up

## UI

```sh
npm i zod @hookform/resolvers react-hook-form
npm i
```

## Auth.js (next-auth)

```sh
npm i next-auth@beta
```

Create .env file

```env
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

```

Create /proxy.ts (Next.js v16)
Create /auth.ts

Add Route Handler
app/api/auth/[...nextauth]/route.ts

## Setup GitHub Provider

Github Settings -> Developer settings -> New OAth App

Homepage URL: http://localhost:3000

Authorization callback URL: http://localhost:3000/api/auth/callback/github

Copy Client ID and Secret

## Setup google

console.cloud.google.com -> Create project -> API & service -> OAuth ->

Authed JS: http://localhost:3000
Authorized redirect URL: http://localhost:3000/api/auth/callback/google

Copy Client ID and Secret

## Sign In

```ts
const handleSignIn = async (provider: "github" | "google") => {
  try {
    await signIn(provider, {
      callbackUrl: ROUTES.HOME,
      redirect: false,
    });
  } catch (error) {}
};
```

## Session

```tsx
import { SessionProvider } from "next-auth/react";

<SessionProvider session={session}>
  <body></body>
</SessionProvider>;
```

## Logout(server side)

```js
import { auth, signOut } from "@/auth";
const Home = async () => {
  const session = await auth();

  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
    </>
  );
};
```
