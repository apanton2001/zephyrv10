import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  // For a warehouse system, we typically want to redirect to the dashboard on root
  redirect("/dashboard");
}
