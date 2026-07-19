import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalNavbar, ConditionalFooter } from "@/components/layout/ConditionalLayout";
import Providers from "@/components/Providers";
import AIChatWidget from "@/components/ui/AIChatWidget";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProductPilot AI | Product Management Copilot",
  description: "Plan Smarter. Build Faster. Powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden w-full">
        <Providers>
          <ConditionalNavbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <ConditionalFooter />
          <AIChatWidget />
          <Toaster theme="dark" richColors />
        </Providers>
      </body>
    </html>
  );
}
