"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const routes = [
  {
    label: "Dashboard",
    href: "/",
    icon: "solar:home-smile-outline",
    iconActive: "solar:home-smile-bold",
  },
  {
    label: "Pipelines",
    href: "/pipelines",
    icon: "solar:widget-5-outline",
    iconActive: "solar:widget-5-bold",
  },
  {
    label: "Activities",
    href: "/activities",
    icon: "solar:calendar-outline",
    iconActive: "solar:calendar-bold",
  },
  {
    label: "Contacts",
    href: "/contacts",
    icon: "solar:users-group-rounded-outline",
    iconActive: "solar:users-group-rounded-bold",
  },
  {
    label: "Items",
    href: "/items",
    icon: "solar:box-minimalistic-outline",
    iconActive: "solar:box-minimalistic-bold",
  },
];

export default function Sidebar({}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen sticky left-0 top-[50px] shrink-0 border-r transition-all",
        open ? "w-[250px] p-5" : "w-[70px] p-3"
      )}
    >
      <ul className="flex flex-col gap-3">
        {routes.map((item, i) => {
          const active = "/" + pathname.split("/")[1] === item.href;
          return (
            <li key={i}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 w-full hover:bg-primary hover:text-primary-foreground rounded",
                  active ? "bg-primary text-primary-foreground" : "",
                  open ? "py-3 px-5" : "py-2 px-3"
                )}
              >
                <Icon
                  icon={active ? item.iconActive : item.icon}
                  className="text-xl"
                />
                {open ? item.label : null}
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => setOpen(!open)}
        className="absolute top-1/2 -translate-y-1/2 -right-4 z-[999]"
      >
        <Icon
          icon={
            open
              ? "solar:round-alt-arrow-left-bold"
              : "solar:round-alt-arrow-right-bold"
          }
          className="text-3xl"
        />
      </button>
    </aside>
  );
}
