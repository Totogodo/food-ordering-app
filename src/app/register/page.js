"use client";
import { use, useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);
    setUserCreated(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      setRegisterError(true);
    } else {
      setUserCreated(true);
    }

    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-4xl text-primary mb-4">Register</h1>
      {userCreated && (
        <div className="text-center text-gray-700">
          User created. Now you can{" "}
          <Link className="underline" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {registerError && (
        <div className="text-center text-red-700">
          An error has occured. Please check data or try again later.
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={creatingUser}
          onChange={(p) => setPassword(p.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="text-center text-lg text-secondary my-2">or</div>
        <button className="flex items-center gap-4  justify-center">
          <img className="max-w-6" src="/google.png" alt="logo google" />
          Loging with Google
        </button>
        <div className="text-center text-sm text-secondary my-2">
          Already have an account?{" "}
          <Link className="underline" href={"/login"}>
            Login
          </Link>
        </div>
      </form>
    </section>
  );
}
