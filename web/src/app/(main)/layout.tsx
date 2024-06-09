import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Banking",
  description: "Generated by create-t3-app",
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) redirect("/login");
  return (
    <main className="main-wrapper">
      <Sidebar user={session.user.user} />
      <div className="main">
        {children}
        <MobileNav />
      </div>
    </main>
  );
}
