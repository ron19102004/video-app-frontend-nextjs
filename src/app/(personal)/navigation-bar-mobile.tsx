"use client";
import React from "react";
import NavigationBarDesktop, { INavBar } from "./navigation-bar-desktop";
import { ClassValue } from "clsx";
import { cn } from "../../lib/utils";
import ForEach from "@/lib/foreach-component";
import { TbHome, TbUserFilled, TbSettings, TbMenu2 } from "react-icons/tb";
import { IconType } from "react-icons/lib";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface INavBarMobile extends INavBar {
  icon: IconType;
}
const navBars: Array<INavBarMobile> = [
  {
    title: "Home",
    href: "/",
    icon: TbHome,
  },
  {
    title: "User",
    href: "/my",
    icon: TbUserFilled,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: TbSettings,
  },
];
interface INavigationBarMobileProps {
  className?: ClassValue;
}
const NavigationBarMobile: React.FC<INavigationBarMobileProps> = ({
  className,
}) => {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "md:hidden fixed w-full bg-p1 bottom-0 z-30 py-1 h-14",
        className
      )}
    >
      <ul className="grid grid-cols-4">
        <ForEach
          list={navBars}
          render={(item: INavBarMobile) => (
            <NavBarMobileItem item={item} isActive={pathname === item.href} />
          )}
        />
        <li className="flex flex-col justify-center items-center">
          <TbMenu2 className="w-6 h-6" />
          <h1>Menu</h1>
        </li>
      </ul>
    </nav>
  );
};
const NavBarMobileItem = ({
  item,
  isActive,
}: {
  item: INavBarMobile;
  isActive: boolean;
}) => {
  return (
    <li className={cn("flex flex-col justify-center items-center", {})}>
      <Link href={item.href}>
        <item.icon
          className={cn("w-6 h-6", {
            "text-p3": isActive,
          })}
        />
      </Link>
      <h1
        className={cn("", {
          "text-p3": isActive,
        })}
      >
        {item.title}
      </h1>
    </li>
  );
};
export default NavigationBarMobile;
