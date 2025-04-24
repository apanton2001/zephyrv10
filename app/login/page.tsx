"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function LoginPage() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Theme toggle button in top right */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <IconSun className="h-5 w-5" />
          ) : (
            <IconMoon className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {/* Login form centered on page */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <LoginForm />
      </div>
      
      {/* Footer */}
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>© 2025 Zephyr Warehouse Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
