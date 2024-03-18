"use client";
import { useState } from "react";
// import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoginInProgress(true);

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });

    if (result.error) {
      // Handle errors, e.g., show an error message
      console.error(result.error);
    } else {
      // Optionally redirect the user or perform other actions upon successful sign-in
      // For example, redirect to the home page or a user dashboard
      window.location.href = "/your-successful-signin-redirect-path";
    }

    setLoginInProgress(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-4xl text-primary mb-4">Login</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          disabled={loginInProgress}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          disabled={loginInProgress}
          onChange={(p) => setPassword(p.target.value)}
        />
        <button type="submit" disabled={loginInProgress}>
          Login
        </button>
        <div className="text-center text-lg text-secondary my-2">or</div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center gap-4  justify-center"
        >
          <img className="max-w-6" src="/google.png" alt="logo google" />
          Loging with Google
        </button>
      </form>
    </section>
  );
}
