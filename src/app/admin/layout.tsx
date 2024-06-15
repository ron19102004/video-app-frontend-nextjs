"use client";
import { AuthContext } from "@/contexts/authContext";
import { Role } from "@/interfaces/user.i";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import AdminSideBar from "./sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuth, userCurrent, checkAuthentication } = use(AuthContext);
  const [allowed, setAllowed] = useState<boolean>(true);
  useEffect(() => {
    if (!isAuth) {
      checkAuthentication();
    } else {
      if (userCurrent?.role === Role.admin) setAllowed(true);
    }
  }, []);
  if (!isAuth) {
    return (
      <main className="">
        <div className="p-3">
          <Button className="bg-p3_2 p-2 rounded-md">
            <Link href={"/login"}>Login</Link>
          </Button>
        </div>
      </main>
    );
  }
  return allowed ? (
    <main className="hidden md:flex min-w-screen min-h-screen">
      <section className="md:basis-/4 lg:basis-1/5 p-3">
        <AdminSideBar />
      </section>
      <section className="flex-1 py-3 pr-3">
        <div className="bg-p2 max-h-full rounded p-3">{children}</div>
      </section>
    </main>
  ) : (
    <main className="">Forbidden</main>
  );
}
