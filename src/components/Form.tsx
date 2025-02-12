"use client";

import { signIn } from "@/lib/auth";

import { ReactNode } from "react";

export default function LoginForm({ children }: { children: ReactNode }) {
  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;

    if (typeof username !== "string" || typeof password !== "string") return;

    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/", // this is the page to redirect to after login
    });
  };

  return (
    <form
      className="flex flex-col gap-4 items-center justify-center"
      onSubmit={handleLogin}
    >
      {children}
    </form>
  );
}
