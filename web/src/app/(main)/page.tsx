import HomeAside from "@/components/HomeAside";
import Welcome from "@/components/Welcome";
import { getServerAuthSession } from "@/server/auth";
import CardStack from "@/components/BankCardStack";
import HomeHeader from "@/components/HomeHeader";

export default async function Home() {
  const session = await getServerAuthSession();
  const user = session?.user.user;
  return (
    <main className="home-page">
      <div className="home-main">
        <HomeHeader user={user} />
      </div>
      <HomeAside
        banks={[
          {
            id: "1",
            balance: "209730.74",
            mask: "3409",
            type: "debit",
            account_name: "Joe Macklemore",
          },
          {
            id: "2",
            balance: "399203.52",
            mask: "6252",
            type: "credit",
            account_name: "Pierre Navet",
          },
          {
            id: "3",
            balance: "12064.35",
            mask: "7823",
            type: "debit",
            account_name: "Carole Jones",
          },
        ]}
      />
      <Welcome />
    </main>
  );
}
