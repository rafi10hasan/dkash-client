"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the Zod schema
const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  pin_number: z.string().regex(/^\d{5}$/, "PIN must be exactly 5 digits"),
  mobile_number: z.string().regex(/^\d{11}$/, "Mobile number must be exactly 11 digits"),
  nid_number: z.string().regex(/^\d{10}$/, "NID number must be exactly 10 digits"),
  role: z.enum(["user", "agent"]),
});

export default function SignUpForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const defaultValues = useMemo(() => ({
    name: "",
    email: "",
    pin_number: "",
    mobile_number: "",
    nid_number: "",
    role: "user",
  }), []);

  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues,
  });

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Account created successfully!");
        router.push("/login");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to register. Please try again later.");
    }
  };

  return (
    <div>
      <Form {...form}>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 grid-cols-12">
            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage className="text-gray-900"/>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage className="text-gray-900"/>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="pin_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">5 Digit PIN</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={passwordVisible ? "text" : "password"}
                          placeholder="5-digit PIN"
                          maxLength={5}
                          inputMode="numeric"
                          {...field}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="absolute right-2 top-2"
                          aria-label="Toggle password visibility"
                        >
                          {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-gray-900"/>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="mobile_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Phone Number</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter your phone" {...field} maxLength={11} />
                    </FormControl>
                    <FormMessage className="text-gray-900"/>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="nid_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">NID Number</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter your NID number" {...field} maxLength={10} />
                    </FormControl>
                    <FormMessage className="text-gray-900"/>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="agent">Agent</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-gray-900"/>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 mt-2">
              <Button className="w-full" type="submit">
                Create an Account
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center font-semibold text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline font-semibold text-white">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Form>
    </div>
  );
}
