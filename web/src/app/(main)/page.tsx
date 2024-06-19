import HomeAside from "@/components/HomeAside";
import Welcome from "@/components/Welcome";
import { getServerAuthSession } from "@/server/auth";
import HomeHeader from "@/components/HomeHeader";
import { getBankAccount, getBankAccounts } from "@/server/actions/bank.actions";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import LastTransactions from "@/components/LastTransactions";

export default async function Home() {
  const session = await getServerAuthSession();
  const user = session?.user.user;
  const banks = await getBankAccounts({ userId: user?.id! });

  return (
    <main className="home-page">
      <div className="home-main">
        <HomeHeader user={user} />
        {user && <LastTransactions user={user} />}
      </div>
      <Suspense fallback={<Spinner />}>
        <HomeAside banks={banks?.data} />
      </Suspense>
      <Welcome />
    </main>
  );
}
