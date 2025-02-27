
'use client'
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import AccountMenu from "./account-menu";
import SideBarMenu from "./Side-bar-menu";
import {data} from './menu-data'
import { useAuth } from "@/hooks/useAuth";

export default function Mobilesidebar() {
    
  return (
    <div className="block h-4 xl:hidden">
      <Sheet>
        <SheetTrigger>
              <Menu className="mt-4"/>
        </SheetTrigger>
        <SheetContent side="left">
        <SheetTitle className="mb-4">Dashboard</SheetTitle>
              <AccountMenu/>
              <SideBarMenu items={data.navMain}/>
        </SheetContent>
      </Sheet>
      </div>
  );
}
