"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ClipboardList, Package, UtensilsCrossed,
  Tags, Users, Truck, BarChart2, DollarSign, Settings,
  UserCircle, Flame, ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";

const navItems = [
  { title: "Dashboard",   href: "/admin/dashboard",  icon: LayoutDashboard },
  { title: "Orders",      href: "/admin/orders",      icon: ClipboardList },
  { title: "Inventory",   href: "/admin/inventory",   icon: Package },
  { title: "Menu",        href: "/admin/menu",        icon: UtensilsCrossed },
  { title: "Categories",  href: "/admin/categories",  icon: Tags },
  { title: "Staff",       href: "/admin/staff",       icon: Users },
  { title: "Suppliers",   href: "/admin/suppliers",   icon: Truck },
  { title: "Sales",       href: "/admin/sales",       icon: DollarSign },
  { title: "Reports",     href: "/admin/reports",     icon: BarChart2 },
  { title: "Settings",    href: "/admin/settings",    icon: Settings },
  { title: "Profile",     href: "/admin/profile",     icon: UserCircle },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col bg-neutral-900 text-white transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-orange-500">
          <Flame className="size-4 text-white" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold tracking-wide truncate">FIRE</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map(({ title, href, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? title : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-orange-500 text-white"
                  : "text-neutral-300 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="size-5 shrink-0" />
              {!collapsed && <span className="truncate">{title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-20 flex size-6 items-center justify-center rounded-full bg-neutral-700 text-white shadow hover:bg-orange-500 transition z-10"
      >
        {collapsed ? <ChevronRight className="size-3" /> : <ChevronLeft className="size-3" />}
      </button>
    </aside>
  );
}
