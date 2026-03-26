"use client";

import React from "react";
import { useState, type SyntheticEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const inputBase =
  "w-full bg-white placeholder:text-gray-500 text-gray-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Registration failed");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Account created successfully");
      // After a successful registration, take the user to the login page.
      router.replace("/login");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm"
      noValidate
    >
      <div>
        <label htmlFor="register-name" className="block text-sm font-medium text-white mb-1">
          Name
        </label>
        <input
          id="register-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputBase}
          placeholder="Your name"
          required
          autoComplete="name"
          disabled={status === "loading"}
        />
      </div>
      <div>
        <label htmlFor="register-email" className="block text-sm font-medium text-white mb-1">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputBase}
          placeholder="you@example.com"
          required
          autoComplete="email"
          disabled={status === "loading"}
        />
      </div>
      <div>
        <label htmlFor="register-password" className="block text-sm font-medium text-white mb-1">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputBase}
          placeholder="••••••••"
          required
          minLength={8}
          autoComplete="new-password"
          disabled={status === "loading"}
        />
      </div>

      {message && (
        <p
          role="alert"
          className={`text-sm ${status === "error" ? "text-red-200" : "text-green-200"}`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-common-styles btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Creating account…" : "Create account"}
      </button>

      <p className="text-sm text-white/80">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded">
          Log in
        </Link>
      </p>
    </form>
  );
}
