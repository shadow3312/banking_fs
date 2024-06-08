import { trpcClient } from "@/trpc/server";

export default async function Home() {
  const users = await trpcClient.users.getAll.query();
  console.log("user", users);
  return <div>OK</div>;
}
