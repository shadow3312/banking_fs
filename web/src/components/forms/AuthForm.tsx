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
import { useCookies } from "next-client-cookies";

import { faker } from "@faker-js/faker";

export default function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const cookies = useCookies();

  const router = useRouter();

  const isLoginForm = type === "login";

  function makeUser(overrides: Partial<IUser> = {}): Partial<IUser> {
    const user: Partial<IUser> = {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      city: faker.location.city(),
      ssn: "1234",
      state: "CA",
      address1: faker.location.street(),
      postalCode: faker.location.zipCode(),
      dateOfBirth: "1990-01-01",
    };

    return {
      ...user,
      ...overrides,
    };
  }

  function fillForm() {
    const user = makeUser();
    form.reset(user);
  }

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const values = makeUser(data);
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
            variant: "destructive",
          });
        } else {
          setIsLoading(false);
          router.push("/");
        }
      } else {
        if (isObjectClean(values)) {
          // Register a new user
          const newUser = await registerUser(values as IRegisterPayload);

          setIsLoading(false);

          toast({
            title: "Hold on",
            description: "You are being redirected quickly",
          });

          if (newUser) {
            // If user is successfuly registered, login
            await signIn("credentials", {
              email: newUser.email,
              password: values.password!,
              callbackUrl: "/",
            });

            cookies.set("justRegistered", "true");
          }
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
        {!isLoginForm && (
          <Button onClick={() => fillForm()}>Auto-fill the form</Button>
        )}
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
