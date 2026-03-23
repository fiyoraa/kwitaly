import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Kwitaly — Invoice yang Rapi, Bisnis yang Lancar",
  description: "Bikin dan kelola invoice dengan mudah. Kwitaly adalah tool modern untuk profesional dan bisnis kecil.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Kwitaly — Invoice yang Rapi, Bisnis yang Lancar",
    description: "Bikin dan kelola invoice dengan mudah dan profesional.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
