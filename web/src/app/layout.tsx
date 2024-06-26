import "@/styles/globals.css";
import { Gabarito as FontSans } from "next/font/google";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { CookiesProvider } from "next-client-cookies/server";
import { Toaster } from "@/components/ui/toaster";
import { getServerAuthSession } from "@/server/auth";
import Provider from "@/providers/SessionProvider";
import RecoilContextProvider from "@/providers/RecoilProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Banking",
  description: "A complete banking system at no cost",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en">
      <body className={`${fontSans.className}`}>
        <RecoilContextProvider>
          <Provider session={session}>
            <CookiesProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                {children}
                <Toaster />
              </ThemeProvider>
            </CookiesProvider>
          </Provider>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
