import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import QueryProvider from "./context/QueryProvider";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Himig Play",
  description:
    "HimigPlay is a personalized music streaming app powered by Spotify API, offering a seamless experience to discover, play, and enjoy your favorite tunes",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
