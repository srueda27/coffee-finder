import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const IBMPlexSans = IBM_Plex_Sans({
  display: 'swap',
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "Coffee Finder",
  description: "Encuentra tu cafetería más cercana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${IBMPlexSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
