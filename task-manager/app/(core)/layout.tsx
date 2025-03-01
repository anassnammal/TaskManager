"use client";

import DialogProvider from "@/components/DialogProvider";
import CacheProvider from "@/components/CacheProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListTodo, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  const links = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Tasks",
      icon: ListTodo,
      href: "/todos",
    },
  ];

  return (
    <>
      <div className="flex w-full sm:w-[85%] mx-auto mt-2 px-2 py-1 gap-2 border-2 rounded-md">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={cn(
                "flex items-center gap-2",
                path === link.href ? 'text-primary':
                'text-primary/50'
            )}
          >
            <link.icon />
            <span className="text-xl underline">{link.title}</span>
          </Link>
        ))}
      </div>
      <CacheProvider>
        <DialogProvider>{children}</DialogProvider>
      </CacheProvider>
    </>
  );
}
