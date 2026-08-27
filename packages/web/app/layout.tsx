import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harmony Template",
  description: "Built with the Harmony Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background-primary text-content-primary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
