"use client";

import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCircle, Menu } from "lucide-react";
import Link from "next/link";

export default function TopNavbar({ title, profileHref = "/admin/profile" }) {
  const { user } = useAuth();
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const name = user?.user_metadata?.full_name || user?.email || "User";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6 gap-4">
      <h2 className="text-lg font-semibold text-foreground truncate">{title}</h2>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 h-9 px-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold shrink-0">
              {getInitials(name)}
            </div>
            <span className="hidden sm:block text-sm font-medium max-w-32 truncate">{name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="text-xs truncate">{user?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={profileHref} className="cursor-pointer">
              <UserCircle className="size-4 mr-2" /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={logout} className="cursor-pointer">
            <LogOut className="size-4 mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
