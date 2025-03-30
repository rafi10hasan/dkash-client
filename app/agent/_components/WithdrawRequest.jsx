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
import { PiHandWithdrawBold } from "react-icons/pi";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function WithdrawRequest() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const session = useAuth();
  const router = useRouter();

  console.log(session);
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  const sendMoneySchema = z.object({
    amount: z.number().min(500, "Amount must be at least 500"),
  });

  const form = useForm({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: {
      amount: "",
    },
  });

  const { errors } = form.formState;

  const handleWithdrawRequest = async (formData) => {
    const updatedFormData = { ...formData, agentId: session?.user.id };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/withdraw-request`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
          cache: "no-store",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast(data.message);
        form.reset();
        router.refresh();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <div>
        <Button className="bg-purple-800" onClick={() => setDialogOpen(true)}>
            withdraw request
          <PiHandWithdrawBold/>
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="">withdraw request</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleWithdrawRequest)} className="space-y-3">
        
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
                  Send withdraw request
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
