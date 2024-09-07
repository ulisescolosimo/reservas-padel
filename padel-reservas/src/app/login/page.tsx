'use client'

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        {isRegistering ? "Register" : "Login"}
      </h1>
      <form onSubmit={handleAuth} className="w-full max-w-xs space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
