"use client";

import { ChevronsUpDown, Home, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AccountMenu() {
  const session = useAuth()
  const router = useRouter();

  function handleLogOut() {
    signOut();
    router.push("/login");
  }

  return (
    <div className="mb-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div size="lg" className="flex gap-2 items-center">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
              <AvatarFallback className="rounded-lg">
                {session?.user?.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold capitalize">{session?.user?.name}</span>
              <span className="truncate text-xs">{session?.user?.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuSeparator />
        
          <DropdownMenuItem onClick={handleLogOut}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
