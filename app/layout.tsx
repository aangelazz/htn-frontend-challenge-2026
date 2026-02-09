import type { Metadata } from "next";
import { Patrick_Hand } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-patrick",
});

export const metadata: Metadata = {
  title: "Hackathon Global™",
  description: "Good grief, it's a hackathon!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${patrick.variable} font-comic bg-[#F9F7F1] text-black antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
