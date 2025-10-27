import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "John Deere Pass",
  description: "Gerenciador de Senhas da John Deere",
  icons: {
    icon: [
      { url: '/logo-john-deere.png', type: 'image/png', sizes: '32x32' },
      { url: '/logo-john-deere.png', type: 'image/png', sizes: '16x16' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout children={children} />
      </body>
    </html>
  );
}
