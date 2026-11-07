import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import SourcesTab from "@/components/SourcesTab";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Undertow",
    template: "%s · Undertow",
  },
  description: "How engagement-optimized AI companions pull users in, one message at a time.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="flex h-dvh flex-col overflow-hidden bg-page font-sans text-ink">
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        <SourcesTab />
      </body>
    </html>
  );
}
