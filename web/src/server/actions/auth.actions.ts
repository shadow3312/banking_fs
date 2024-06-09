"use server";

import { api } from "@/trpc/server";

export async function registerUser(userPayload: IRegisterPayload) {
  try {
    const user = await api.auth.register.mutate(userPayload);

    return user;
  } catch (error) {
    console.log(error);
  }
}
