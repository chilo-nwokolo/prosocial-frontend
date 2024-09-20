import { Providers } from "@/components/Providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Comfortaa, Lato } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export const metadata: Metadata = {
  title: "ProSocial Web App",
  description: "Connect with your friends",
  manifest: "/manifest.json",
  icons: { apple: "/icon-152x152" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable} ${lato.variable}`}>
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === "production" ? (
          <GoogleAnalytics gaId="G-VYFS0L1TWZ" />
        ) : null}
      </body>
    </html>
  );
}
