"use client";
import React from "react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
      <div className="flex">
        <Sidebar />
        <article className="flex-1 overflow-y-auto h-[calc(100vh-50px)]">
          {children}
        </article>
      </div>
    </main>
  );
}
