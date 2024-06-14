"use client";
import { AuthContext } from "@/contexts/authContext";
import { Role } from "@/interfaces/user.i";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import AdminSideBar from "./sidebar";
import Link from "next/link";

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
        <Link className="bg-p3_2 p-2 rounded-md" href={"/login"}>
          Login
        </Link>
      </main>
    );
  }
  return allowed ? (
    <main className="flex min-w-screen min-h-screen">
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