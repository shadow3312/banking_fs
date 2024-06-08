import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "~/app";
import superjson from "superjson";
import { getServerAuthSession } from "@/server/auth";

export const api = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3001/trpc",
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
