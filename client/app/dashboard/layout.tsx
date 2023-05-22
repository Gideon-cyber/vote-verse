import ClientOnly from "@/components/ClientOnly";
import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-row justify-start">
      {/* <ClientOnly> */}
      <Sidebar />
      {/* </ClientOnly> */}
      <div className="bg-primary flex-1 p-4 text-white">{children}</div>
    </div>
  );
}
