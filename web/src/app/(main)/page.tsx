import HomeAside from "@/components/HomeAside";
import Welcome from "@/components/Welcome";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  const user = session?.user.user;
  return (
    <main className="home-page">
      <div className="home-main"></div>
      <HomeAside />
      <Welcome />
    </main>
  );
}
