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
import { FaRegPaperPlane } from "react-icons/fa";
export default function UserHeader({ data }) {
  const [isBlurred, setIsBlurred] = useState(true);
  function handleLogout() {
    signOut();
  }
  const formattedBDT = data.balance.toLocaleString("en-BD", {
    currency: "BDT",
  });
  return (
    <>
      <div className="w-full bg-pink-700 h-auto pb-4 md:pb-0">
        <nav className="flex px-6 justify-between items-center h-20">
          <div className="flex gap-1">
            <h1 className="text-white text-xl md:text-2xl font-semibold">Dkash</h1>
            
          </div>
           
          <div
              onClick={() => setIsBlurred((prev)=>!prev)}
              className={`p-2 border ${
                isBlurred ? "blur-sm" : "blur-none"
              } bg-pink-500 text-white rounded-sm flex justify-between w-52 md:w-60 px-2 py-2`}
            >
              <h1>balance</h1>
              <h1>{formattedBDT}&#2547;</h1>
            </div>
          <ul className="hidden md:flex items-center justify-center  gap-4">
          
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
        <ul className="flex flex-wrap items-center justify-center gap-4 md:hidden">
          
            <li>
              <SendMoney senderNumber={data.mobile_number}/>
            </li>

            <li>
              <CashOut senderNumber={data.mobile_number}/>
            </li>
          </ul>
      </div>
    </>
  );
}
