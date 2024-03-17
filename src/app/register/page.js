"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-4xl text-primary mb-4">Register</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(p) => setPassword(p.target.value)}
        />
        <button type="submit">Register</button>
        <div className="text-center text-lg text-secondary my-2">or</div>
        <button className="flex items-center gap-4  justify-center">
          <img className="max-w-6" src="/google.png" alt="logo google" />
          Logging with Google
        </button>
      </form>
    </section>
  );
}
