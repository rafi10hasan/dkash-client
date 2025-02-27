
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import SideBar from "./_components/SideBar";
import Mobilesidebar from "./_components/mobile-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

export default async function AdminDashboardLayout({ children }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return (
     <SessionProvider>
      <div className="flex flex-col xl:flex-row gap-6 w-full ml-6 xl:ml-0">
        {/* Sidebar */}
        <aside className="h-0 xl:min-h-screen w-[20rem] bg-white shadow-sm">
        
             <Mobilesidebar/>
             <SideBar/>
        </aside>
        
        <main className="mt-10 mr-6 flex-grow xl:w-[calc(100%-20rem)]">
          {children}
          <Toaster />
        </main>
      </div>
      </SessionProvider>
   
  );
}
