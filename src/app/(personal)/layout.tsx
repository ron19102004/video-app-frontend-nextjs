"use client"
import React, { use } from "react";
import NavigationBarDesktop from "./navigation-bar-desktop";
import { AuthContext } from "@/contexts/authContext";
import NavigationBarMobile from "./navigation-bar-mobile";

export default function PersonalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const useAuth = use(AuthContext);
  React.useEffect(() => {
    if(!useAuth.isAuth){
      useAuth.checkAuthentication();
    }
  }, []);
  return (
    <main className="relative">
      <NavigationBarDesktop />
      <NavigationBarMobile/>
      <section className="mb-14 md:mb-0 lg:container bg-p2 rounded">{children}</section>
    </main>
  );
}
