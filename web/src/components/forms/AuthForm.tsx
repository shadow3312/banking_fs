"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authFormSchema } from "@/lib/schemas";
import { z } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import FormInput from "../FormInput";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function AuthForm({ type }: AuthFormProps) {
  const isLoginForm = type === "login";

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {}
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

          <Button className="rounded-button" type="submit">
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
