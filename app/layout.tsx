import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code-First-Design - Design System",
  description: "A framework for prototyping and promoting UI components with AI editors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

