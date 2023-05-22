import ClientOnly from "@/components/ClientOnly";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-row justify-start">
      <ClientOnly>
        <Sidebar />
      </ClientOnly>
      <div className="bg-primary flex-1 text-white overflow-hidden flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
