import LogoutButton from "@/components/LogoutButton";
import Welcome from "@/components/Welcome";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  const user = session?.user.user;
  return (
    <main>
      <h1>Welcome {user?.firstName}</h1>
      <LogoutButton />
      <Welcome />
    </main>
  );
}
