"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authFormSchema } from "@/lib/schemas";
import { z } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import FormInput from "../FormInput";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "../ui/use-toast";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";
import { isObjectClean } from "@/lib/utils";
import { registerUser } from "@/server/actions/auth.actions";

export default function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const router = useRouter();

  const isLoginForm = type === "login";

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (isLoginForm) {
        const loginPayload = {
          email: values.email,
          password: values.password,
        };
        const result = await signIn("credentials", {
          ...loginPayload,
          redirect: false,
        });

        if (result?.error) {
          setIsLoading(false);
          console.log(result.error);
          toast({
            title: "Error",
            description: "Invalid credentials",
          });
        } else {
          setIsLoading(false);
          router.push("/");
        }
      } else {
        const { email, password, firstName, lastName, city } = values;
        const userPayload = {
          email,
          password,
          firstName,
          lastName,
          city,
        };
        if (isObjectClean(userPayload)) {
          const definedUserPayload = userPayload as IRegisterPayload;
          console.log("loading...");

          const user = await registerUser(definedUserPayload);

          setIsLoading(false);
          console.log("userr", user);
          // if (user) {
          //   setUser(user);
          // }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="auth-form-wrapper">
      <header className="form-header">
        <h3 className="form-title">{isLoginForm ? `LOGIN` : `REGISTER`}</h3>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          {!isLoginForm && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <FormInput
                  control={form.control}
                  name="firstName"
                  placeholder="First name"
                />
                <FormInput
                  control={form.control}
                  name="lastName"
                  placeholder="Last name"
                />
              </div>
              <FormInput
                control={form.control}
                name="city"
                placeholder="City"
              />
            </div>
          )}
          <FormInput
            control={form.control}
            name="email"
            placeholder="Your email"
          />

          <FormInput
            control={form.control}
            name="password"
            placeholder="Your password"
          />

          <Button className="rounded-button" type="submit" disabled={isLoading}>
            {isLoading && (
              <div className="mr-2">
                <Spinner />
              </div>
            )}
            Let me in <LogIn className="ml-4 h-4 w-4" />
          </Button>
        </form>
      </Form>
      <div>
        {isLoginForm ? `Don't have an account yet` : `Already have an account`}{" "}
        ?{" "}
        <Link href={isLoginForm ? "/register" : "/login"}>
          {isLoginForm ? `Register` : `Login`}
        </Link>
      </div>
    </div>
  );
}
