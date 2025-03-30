"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { FaRegPaperPlane } from "react-icons/fa";

 
export default function SendMoneyToUser ({userId,agentNumber}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const session = useAuth();
    const [isVerifiedAgent,setIsVerifyAgent] = useState(false)
    const router  = useRouter();
    console.log(session)
    useEffect(()=>{
         if(!session){
          router.push('/login')
         }
    },[session])

    
    const sendMoneySchema = z
    .object({
      receiverPhone: z.string().min(11, "Receiver ID must be 11 digits").max(11, "Receiver ID must be 11 digits"),
      amount: z
        .number()
        .min(200, "Amount must be at least 200"),
    })
    .refine((data) => agentNumber !== data.receiverPhone, {
      message: "you can't send money to you",
      path: ["receiverPhone"],
    });
   
    const pinVerifySchema= z.object({
        pin_number: z.string().length(5, "pin number must be 5 digit"),
    })

    const verifyForm = useForm({
        resolver: zodResolver(pinVerifySchema),
        defaultValues:{
            pin_number:""
        }
    })
  
    const form = useForm({
      resolver: zodResolver(sendMoneySchema),
      defaultValues: {
        receiverPhone: "",
        amount: "", // Default min value
      },
    });
  
    const { errors } = form.formState;
    const {verifyErrors} = verifyForm.formState;

    const handleSendMoney = async (formData) => {
      const updateFormData = {...formData,id:userId}
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/agent-to-user/send-money`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateFormData),
          cache: "no-store",
        });
        const data = await response.json();
        console.log(data)
        toast(data.message)
        router.refresh();
        form.reset()
    };

    const handleAgentVerify = async(pinInfo)=>{
        const agentInfo = {...pinInfo, id:userId}
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify/agent`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(agentInfo),
            cache: "no-store",
          });
          const data = await response.json();
          if(data.match){
            setIsVerifyAgent(true);
            setDialogOpen(false)
          }
          toast(data.message)
    }
  return (
    <>
      <div>
          <Button className="bg-violet-600" onClick={()=>setDialogOpen(true)}>send money to user<FaRegPaperPlane /></Button>
      </div>
       {/* pin number verify */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="">verify agent</DialogTitle>
          </DialogHeader>
          <Form {...verifyForm}>
            <form onSubmit={verifyForm.handleSubmit(handleAgentVerify)} className="space-y-3">
              <FormField
                control={verifyForm.control}
                name="pin_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter agent pin</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="enter your pin" {...field} />
                    </FormControl>
                    <FormMessage>{verifyErrors?.pin_number?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <div className="w-full mt-2">
                <Button className="w-full bg-green-400" type="submit">
                  verify
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* send money agent to user */}
      <Dialog open={isVerifiedAgent} onOpenChange={setIsVerifyAgent}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="">Send Money</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSendMoney)} className="space-y-3">
             

              {/* Receiver Field */}
              <FormField
                control={form.control}
                name="receiverPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiver Phone No</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Receiver phone number" {...field} />
                    </FormControl>
                    <FormMessage>{errors?.receiverPhone?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Amount Field */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={200}
                        placeholder="Enter amount"
                        value={field.value}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (!isNaN(value)) {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage>{errors?.amount?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <div className="w-full mt-2">
                <Button className="w-full" type="submit">
                  Send
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
