import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "~/app";
import superjson from "superjson";
import { getServerAuthSession } from "@/server/auth";
import { env } from "@/env";

export const api = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${env.NEXT_API_URL}/trpc`,
      transformer: superjson,
      headers: async () => {
        const session = await getServerAuthSession();
        const token = session?.user.token;
        return token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {};
      },
    }),
  ],
});
