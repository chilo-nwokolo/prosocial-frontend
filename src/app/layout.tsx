import { Providers } from "@/components/Providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "ProSocial App",
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
      <body className={`${inter.variable} ${playfair_display.variable}`}>
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === "production" ? (
          <GoogleAnalytics gaId="G-VYFS0L1TWZ" />
        ) : null}
      </body>
    </html>
  );
}
