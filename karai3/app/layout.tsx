import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KarAI3 - AI Chat",
  description: "AI Chat Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
