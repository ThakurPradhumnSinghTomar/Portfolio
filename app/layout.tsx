import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const siteName = "Pradhumn Singh Tomar | Software Engineer";
const siteDescription =
  "Premium personal portfolio of Pradhumn Singh Tomar, focused on full-stack engineering, backend systems, and AI-powered product development.";
const siteUrl = "https://rebuild-with-pradhumn.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
    images: [
      {
        url: "/projects/rebuild.svg",
        width: 1200,
        height: 720,
        alt: "Pradhumn Singh Tomar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/projects/rebuild.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className="min-h-screen font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
