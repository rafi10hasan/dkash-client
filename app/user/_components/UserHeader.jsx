"use client";
import { useState } from "react";
import CashOut from "./CashOut";
import SendMoney from "./SendMoney";
import { signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LogOut } from "lucide-react";
export default function UserHeader({ data }) {
  const [isBlurred, setIsBlurred] = useState(true);
  function handleLogout() {
    signOut();
  }
  return (
    <>
      <div className="w-full bg-purple-400 h-20 mt-2 rounded-md">
        <nav className="flex px-6 justify-between items-center h-20">
          <div className="">
            <h1 className="text-white font-semibold">PayHero</h1>
          </div>

          <ul className="flex items-center justify-center  gap-4">
            <li
              onClick={() => setIsBlurred(false)}
              className={`p-2 border ${
                isBlurred ? "blur-sm" : "blur-none"
              } bg-pink-500 text-white rounded-sm flex justify-between w-52 px-2 py-2`}
            >
              <h1>balance</h1>
              <h1>{data.balance}&#2547;</h1>
            </li>
            <li>
              <SendMoney senderNumber={data.mobile_number}/>
            </li>

            <li>
              <CashOut senderNumber={data.mobile_number}/>
            </li>
          </ul>

          <div className="justify-self-center">
           
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <div className="w-12 h-12 flex items-center justify-center text-white rounded-full bg-yellow-500">
                 {data.name[0].toUpperCase()}
                 </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
            
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="#" onClick={handleLogout}>
                      Logout <LogOut className="size-4 ml-2" />
                    </Link>
                  </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
              
           
          </div>
        </nav>
      </div>
    </>
  );
}
