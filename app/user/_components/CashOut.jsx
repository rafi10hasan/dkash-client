
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
import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";


export default function CashOut({senderNumber}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const session = useAuth();
  const router  = useRouter();

  console.log(session)
  useEffect(()=>{
       if(!session){
        router.push('/login')
       }
  },[session])

  
  const sendMoneySchema = z
  .object({
    agentNumber: z.string().min(11, "Receiver ID must be 11 digits").max(11, "Receiver ID must be 11 digits"),
    amount: z
      .number()
      .min(100, "minimum cash out is 100tk"),
    pin_number: z.string().length(5, "pin number must be 5 character"),
  })
  .refine((data) => senderNumber !== data.agentNumber, {
    message: "you can't send money to you",
    path: ["receiverPhone"],
  });

  const form = useForm({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: {
      agentNumber: "",
      amount: "",
      pin_number: ""
      // Default min value
    },
  });

  const { errors } = form.formState;

  const handleCashOut = async (formData) => {
    console.log(session.accessToken)
    const updateFormData = {...formData,senderPhone:senderNumber}
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/user-cash-out`, {
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
      form.reset();
      router.refresh()
  };
    
  return (
    <>
      <div>
        <Button onClick={() => setDialogOpen(true)}>
           cash out
          <Rocket />
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="">Cash out</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCashOut)} className="space-y-3">
             

              {/* Receiver Field */}
              <FormField
                control={form.control}
                name="agentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Number</FormLabel>
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
                        type="text"
                        min={100}
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

            <FormField
                control={form.control}
                name="pin_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>pin number</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="enter your pin" {...field} />
                    </FormControl>
                    <FormMessage>{errors?.pin_number?.message}</FormMessage>
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
