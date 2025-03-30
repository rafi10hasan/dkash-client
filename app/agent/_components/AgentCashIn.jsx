"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { HandCoins, Plus} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { GiCash } from "react-icons/gi";

export default function AgentCashIn() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const session = useAuth();
  const router  = useRouter();

  console.log(session)
  useEffect(()=>{
       if(!session){
        router.push('/login')
       }
  },[session])

  const handleCashInRequestToAdmin = async (e) => {
    e.preventDefault()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/cash-in-request`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({agentId:session?.user.id}),
        cache: "no-store",
      });
      const data = await response.json();
      console.log(data)
      toast(data.message)
      setDialogOpen(false)
  };
    
  return (
    <>
      <div>
        <Button className="bg-teal-600" onClick={() => setDialogOpen(true)}>
           cash in
          <GiCash/>
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="">Send Request Money to admin</DialogTitle>
          </DialogHeader>

            <form onSubmit={handleCashInRequestToAdmin} className="space-y-3">

              <div className="w-full mt-2">
                <Button className="w-full" type="submit">
                   cash in request
                </Button>
              </div>
            </form>
          
        </DialogContent>
      </Dialog>
    </>
  );
}
