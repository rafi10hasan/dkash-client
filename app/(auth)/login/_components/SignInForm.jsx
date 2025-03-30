'use client';

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { credentialLogin } from "@/app/actions";
import { EyeIcon, EyeOffIcon } from "lucide-react";
export default function SignInForm() {
  const [error,setError] = useState('');
  const [passwordVisible,setPasswordVisible] = useState(false);
  
  const form = useForm({
    defaultValues: {
      mobile_number: '',
      pin_number: ''
    }
  });
  const router = useRouter();

  const onSubmit = async(data) => {
    try{
      const response = await credentialLogin(data);
     
      if(!response){
        setError('invalid email or password');
      }
      else{
        router.push('/')
      }
    }catch(err){
      setError('invalid email or password')
    }
     
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="mobile_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">phone</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your phone number" {...field} />
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
                <FormLabel className="text-white">pin number</FormLabel>
                <FormControl>

                <div className="flex relative ">
                    <Input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Enter your 5 digit pin number"
                      {...field}
                    />
                    <Button
                      variant="text"
                      size="md"
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute  right-2 top-3"
                      aria-label="Toggle password visibility"
                    >
                      {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
                    </Button>
                  </div>

                  {/* <Input type="password" placeholder="Enter your password" {...field} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (<p className="text-red-600">{error}</p>)}
          <div className="w-full mt-2">
            <Button className="w-full" type="submit">
              sign in
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm text-white">
          do you have an account?{" "}
          <Link href="/register" className="underline text-deep-cyan font-semibold">
            Sign up
          </Link>
        </div>
      </Form>
    </div>
  );
}
