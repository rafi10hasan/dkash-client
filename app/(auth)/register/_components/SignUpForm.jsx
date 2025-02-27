"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Define the Zod schema
const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  pin_number: z.string().length(5, "PIN number must be exactly 5 characters"), 
  mobile_number: z.string().length(11, "Mobile number must be exactly 11 digits"), 
  nid_number: z.string().length(10, "NID number must be exactly 10 digits"), 
  role: z.enum(["user", "agent"]),
});


export default function SignUpForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      pin_number:"",
      mobile_number:"",
      nid_number:"",
      role:"user"
    },
  });
  const router = useRouter();
  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data)
      if (response.status === 201) {
        router.push("/login");
        toast(data.message)
      } else {
        toast(data.message)
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div>
      <Form {...form}>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pin_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>set your 5 digit pin</FormLabel>
                  <FormControl>
                    <div className="flex relative">
                      <Input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <Button
                        variant="text"
                        size="md"
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute right-2 top-3"
                        aria-label="Toggle password visibility"
                      >
                        {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your 5 digit pin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>role</FormLabel>
                  <FormControl>
                    <Select onValueChange={(val) => field.onChange(val)} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>select role</SelectLabel>
                          {Array.from(["user", "agent"], (item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nid_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>your nid number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your valid nid number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full mt-2">
              <Button className="w-full" type="submit">
                create an account
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline font-semibold text-deep-cyan">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Form>
    </div>
  );
}
