import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import LocationProviderWrapper from "@/components/LocationProviderWrapper";
import { getDomain } from "@/utils";

const IBMPlexSans = IBM_Plex_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Coffee Finder",
  description: "Encuentra tu cafetería más cercana",
  metadataBase: getDomain(),
  alternates: {
    canonical: `/`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${IBMPlexSans.className} antialiased`}>
        <LocationProviderWrapper>{children}</LocationProviderWrapper>
        <footer className="mt-auto bg-violet-900 py-6 text-lg text-white">
          <div className="text-center">By Santiago Rueda Ortiz</div>
        </footer>
      </body>
    </html>
  );
}
