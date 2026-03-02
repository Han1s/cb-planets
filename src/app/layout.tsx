import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PlanetsProvider } from "@/context/PlanetsContext";
import { Suspense } from "react";

const getPlanets = async (): Promise<string | Planet[]> => {
  try {
    const res = await fetch("https://swapi.info/api/planets", {
      next: { revalidate: 3600, tags: ["planets"] },
    });

    if (!res.ok) {
      return `API error: ${res.status}`;
    }

    return await res.json();
  } catch (error) {
    console.error("Planet fetch failed:", error);
    return "Failed to load planets";
  }
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
  children: React.ReactNode;
}>) {
  const planets = await getPlanets();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen items-center justify-center font-sans bg-black">
          <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-12 px-16bg-black sm:items-start">
            <PlanetsProvider planets={planets}>
              <Suspense fallback={"Loading planets..."}>{children}</Suspense>
            </PlanetsProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
