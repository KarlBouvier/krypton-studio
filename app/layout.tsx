import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krypton Studio — Business Website Demos",
  description: "Showcase demos for restaurant, pizzeria, and coiffeur websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
