"use client";
import ForEach from "@/lib/foreach-component";
import React, { Fragment, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { VideoIcon } from "@/assets";
import SearchBar from "./search-bar";
import { SlUser } from "react-icons/sl";
import { AuthContext } from "@/contexts/authContext";
import { Role } from "@/interfaces/user.i";

export interface INavBar {
  title: string;
  href: string;
}
const navBars: Array<INavBar> = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Categories",
    href: "/categories",
  },
  {
    title: "Countries",
    href: "/countries",
  },
];
const NavigationBarDesktop = () => {
  const pathname = usePathname();
  const { isAuth, userCurrent } = React.use(AuthContext);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (isAuth && userCurrent?.role === Role.admin) {
      setIsAdmin(true);
    }
  }, [isAuth]);
  return (
    <header className="bg-p2 hidden md:flex justify-around items-center container py-1 my-1 rounded shadow-lg">
      <div className="flex justify-center items-center space-x-3">
        <Image src={VideoIcon} alt="icon" className="w-12 h-12 rounded-full" />
        <h1 className="text-xl font-bold">Video</h1>
      </div>
      <nav className="flex justify-around space-x-4">
        <ForEach
          list={navBars}
          render={(item: INavBar) => (
            <Link
              href={item.href}
              className={cn(
                "flex justify-center items-center space-x-2 font-semibold lg:text-lg",
                {
                  "text-p3": pathname === item.href,
                  "": pathname !== item.href,
                }
              )}
            >
              <h1>{item.title}</h1>
            </Link>
          )}
        />
      </nav>
      <SearchBar />
      <div>
        <div className="flex justify-start items-center gap-2">
          <SlUser />
          {isAdmin ? (
            <Link href={"/admin"} className="hover:text-red-500 hover:underline">
              Admin
            </Link>
          ) : null}
          {userCurrent?.confirmed ? (
            <Link href={"/manager"} className="hover:text-blue-500 hover:underline">
              Manager
            </Link>
          ) : null}
        </div>
        {!isAuth ? (
          <Fragment>
            <div className={"space-x-1"}>
              <Link href={"/login"} className="hover:text-p3">
                Login
              </Link>
              <span>{"/"}</span>
              <Link href={"/register"} className="hover:text-p3">
                Register
              </Link>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <Link href={"/my"} className="hover:text-p3 font-bold">
              {userCurrent?.fullName}
            </Link>
          </Fragment>
        )}
      </div>
    </header>
  );
};

export default NavigationBarDesktop;
