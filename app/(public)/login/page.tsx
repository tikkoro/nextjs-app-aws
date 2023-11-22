"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn, signOut } from "next-auth/react";

import * as z from "zod";

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
import {
  BiSolidShow,
  BiSolidHide,
  BiSolidLock,
  BiSolidUser,
} from "react-icons/bi";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(1, { message: "Input Username" }),
  password: z.string().min(1, { message: "Input Password" }),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Write login process
    await signIn("credentials", {
      redirect: false,
      username: form.getValues("username"),
      password: form.getValues("password"),
    });
    console.log(values);
  }

  return (
    <section className="bg-slate-200 dark:bg-gray-900">
      <div className="flex items-center justify-center h-screen">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 bg-white p-5 rounded-md  w-11/12 sm:w-[450px] max-w-[450px]"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-0 top-0 p-2 h-full flex items-center">
                        <BiSolidUser className="w-5 h-5" />
                      </div>
                      <Input
                        {...field}
                        className={`pl-10 ${
                          form.formState.errors.username &&
                          "focus-visible:ring-red-500"
                        }`}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className={`px-10 ${
                          form.formState.errors.password &&
                          "focus-visible:ring-red-500"
                        }`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full hover:bg-transparent p-2 mr-1"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <BiSolidHide className="w-6 h-6" />
                        ) : (
                          <BiSolidShow className="w-6 h-6" />
                        )}
                      </Button>
                      <div className="absolute left-0 top-0 p-2 h-full flex items-center">
                        <BiSolidLock className="w-5 h-5" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
