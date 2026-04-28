import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/src/app/providers/Providers";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kanban App",
  description: "Kanban task management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}