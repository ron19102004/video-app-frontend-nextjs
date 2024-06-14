"use client";
import { cn } from "@/lib/utils";
import React, { use } from "react";
import { INavBarMobile } from "../(personal)/navigation-bar-mobile";
import { TbCategoryFilled, TbWorld, TbHome, TbLogin } from "react-icons/tb";
import ForEach from "@/lib/foreach-component";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "@/contexts/authContext";

interface INavSideBar extends INavBarMobile {}
const navBars: Array<INavSideBar> = [
  {
    title: "Home",
    href: "/admin",
    icon: TbHome,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: TbCategoryFilled,
  },
  {
    title: "Countries",
    href: "/admin/countries",
    icon: TbWorld,
  },
];
const AdminSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = use(AuthContext);
  return (
    <aside className={cn("bg-p2 h-full rounded flex flex-col justify-between")}>
      <ul className="space-y-2 p-2">
        <h1 className="font-bold text-2xl">Resource Management</h1>
        <ForEach
          list={navBars}
          render={(item: INavSideBar) => (
            <Link
              href={item.href}
              className={cn(
                "flex justify-start items-center gap-2 font-bold  rounded-md p-2 transition-all ",
                {
                  "bg-p3_2 shadow-md": pathname === item.href,
                  "hover:bg-p3": pathname !== item.href,
                }
              )}
            >
              <item.icon className="w-10 h-10" />
              <h1>{item.title}</h1>
            </Link>
          )}
        />
      </ul>
      <div className="p-2">
        <button
          onClick={() => {
            logout((href) => {
              router.push(href);
            });
          }}
          className={cn(
            "flex justify-start items-center gap-2 font-bold  rounded-md transition-all hover:bg-p3 w-full p-2"
          )}
        >
          <TbLogin className="w-10 h-10" />
          <h1>Logout</h1>
        </button>
      </div>
    </aside>
  );
};

export default AdminSideBar;
