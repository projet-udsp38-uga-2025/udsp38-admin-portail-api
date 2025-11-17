import "reflect-metadata";
import "@/infrastructure/config/InjectionDependencies";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ProvidersWrapper } from "@/ui/providers/providersWrapper";
import DashboardLayout from "@/ui/components/DashboardLayout";
import { BreadcrumbSync } from "@/ui/components/BreadcrumbSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portail Admin UDSP38",
  description: "Portail d'administration de contenu pour l'UDSP38",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProvidersWrapper>
          <DashboardLayout>
            <BreadcrumbSync />
            {children}
          </DashboardLayout>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
