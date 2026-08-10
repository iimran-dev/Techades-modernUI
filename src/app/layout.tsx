import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getAssetPath } from "@/utils/basePath";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Techades — Team Experience",
  description: "Meet the elite engineering collective behind Techades. 40+ specialists across technologies, industries, and locations building digital products that scale.",
  keywords: ["Techades", "Team", "Engineering", "Software Development", "Digital Products"],
  icons: {
    icon: getAssetPath('/favicon.png'),
    shortcut: getAssetPath('/favicon.png'),
    apple: getAssetPath('/favicon.png'),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
