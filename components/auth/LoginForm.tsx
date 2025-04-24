"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IconLock, IconMail, IconLogin } from "@tabler/icons-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication - in a real app, this would call an API
    try {
      // Basic validation
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }

      // Mock authentication - in production, this would be a server API call
      if (email === "admin@zephyrwms.com" && password === "admin123") {
        // Simulating a wait
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Store authentication in localStorage (in a real app, use secure cookies or tokens)
        localStorage.setItem("zephyr_user", JSON.stringify({
          email,
          name: "Admin User",
          role: "Administrator"
        }));
        
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card dark:bg-card rounded-lg shadow-md border dark:border-border p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Zephyr WMS</h1>
        <p className="text-muted-foreground">Sign in to your warehouse management system</p>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconMail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@zephyrwms.com"
                className="pl-10 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconLock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                className="pl-10 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a 
                href="/forgot-password" 
                className="text-primary hover:underline"
                aria-label="Forgot your password? Reset it here"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-primary text-primary-foreground rounded-md text-sm font-medium flex items-center justify-center"
              aria-label="Sign in to your account"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <IconLogin className="mr-2 h-4 w-4" aria-hidden="true" />
                  Sign in
                </span>
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Demo credentials: <span className="font-medium">admin@zephyrwms.com / admin123</span></p>
      </div>
    </div>
  );
}
