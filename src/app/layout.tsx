import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PlanetsProvider } from "@/context/PlanetsContext";

const getPlanets = async () => {
  const res = await fetch("https://swapi.info/api/planets", {
    next: { revalidate: 3600, tags: ["planets"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch planets");
  }

  return res.json();
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Planets",
  description: "Star Wars planet list",
};

export default async function RootLayout({
  children,
}: Readonly<{
  searchParams: string;
  children: React.ReactNode;
}>) {
  const planets = await getPlanets();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen items-center justify-center font-sans bg-black">
          <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16bg-black sm:items-start">
            <PlanetsProvider planets={planets}>{children}</PlanetsProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
