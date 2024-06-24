import HomeAside from "@/components/HomeAside";
import Welcome from "@/components/Welcome";
import { getServerAuthSession } from "@/server/auth";
import HomeHeader from "@/components/HomeHeader";
import { getBankAccount, getBankAccounts } from "@/server/actions/bank.actions";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import LastTransactions from "@/components/LastTransactions";
import LoadingSection from "@/components/LoadingSection";

export default async function Home() {
  const session = await getServerAuthSession();
  const user = session?.user.user;
  const banks = await getBankAccounts({ userId: user?.id! });

  if (!banks) return;

  return (
    <main className="home-page">
      {user && (
        <div className="home-main">
          <HomeHeader user={user} />
          <LastTransactions user={user} />
        </div>
      )}
      <Suspense fallback={<LoadingSection />}>
        <HomeAside banks={banks?.data} />
      </Suspense>
      <Welcome />
    </main>
  );
}
