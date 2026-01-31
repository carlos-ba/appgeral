import "./globals.css";
import { Space_Grotesk, Syne } from "next/font/google";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-display" });

export const metadata = {
  title: "AppGeral",
  description: "Monitoramento inteligente de refrigeração.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${space.variable} ${syne.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
