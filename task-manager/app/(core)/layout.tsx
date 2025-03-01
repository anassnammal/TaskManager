"use client";

import DialogProvider from "@/components/DialogProvider";
import CacheProvider from "@/components/CacheProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListTodo, LayoutDashboard } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  const nav = {
    '/dashboard': {
        title: 'Tasks',
        icon: ListTodo,
        href: '/todos'
    },
    '/todos': {
        title: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard'
    }
  }
  const currentNav = nav[path as '/dashboard' | '/todos'];

  return (
    <>
      <div className="mx-4 mt-2">
          <Link href={currentNav.href}  className="flex items-center gap-2">
            <currentNav.icon />
            <span className="text-xl underline">{currentNav.title}</span>
          </Link>
      </div>
      <CacheProvider>
        <DialogProvider>{children}</DialogProvider>
      </CacheProvider>
    </>
  );
}
