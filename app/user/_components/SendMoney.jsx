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
import { FaRegPaperPlane } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";


export default function SendMoney({senderNumber}) {
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
    receiverPhone: z.string().min(11, "Receiver ID must be 11 digits").max(11, "Receiver ID must be 11 digits"),
    amount: z
      .number()
      .min(50, "Amount must be at least 50"),
  })
  .refine((data) => senderNumber !== data.receiverPhone, {
    message: "you can't send money to you",
    path: ["receiverPhone"],
  });

  const form = useForm({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: {
      receiverPhone: "",
      amount: "", // Default min value
    },
  });

  const { errors } = form.formState;

  const handleSendMoney = async (formData) => {
    console.log(session.accessToken)
    const updateFormData = {...formData,senderPhone:senderNumber}
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/send-money`, {
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
        <Button className="bg-teal-600" onClick={() => setDialogOpen(true)}>
          send money
          <FaRegPaperPlane/>
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                        type="text"
                        min={50}
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
