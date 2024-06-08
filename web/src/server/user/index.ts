import { env } from "@/env";

export async function login(email: string, password: string) {
  const payload = {
    email,
    password,
  };

  console.log("p", JSON.stringify(payload));
  const res = await fetch(`${env.NEXT_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error(`An error occured`);
  }

  const data = await res.json();

  return data;
}

export async function getAll(): Promise<IUser[]> {
  const res = await fetch(`${env.NEXT_API_URL}/users`, {
    cache: "no-cache",
  }).then((response) => {
    return response;
  });

  if (!res.ok) {
    throw new Error(`An error occured`);
  }

  const data = await res.json();

  return data;
}

export async function getById(id: string): Promise<IUser> {
  const res = await fetch(`${env.NEXT_API_URL}/users/${id}`, {
    cache: "no-cache",
  }).then((response) => {
    return response;
  });

  if (!res.ok) {
    throw new Error(`An error occured`);
  }

  const data = await res.json();

  return data;
}

export const userService = {
  login,
  getAll,
  getById,
};
