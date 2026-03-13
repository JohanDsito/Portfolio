import "@/src/app/globals.css";
import { ThemeProvider } from "@/src/components/ThemeContext"; // Asegúrate de ajustar la ruta si es necesario
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Johan Delgado - Portfolio",
  description: "Portfolio profesional de Johan Delgado, Ingeniero de Software",
  viewport: "width=device-width, initial-scale=1",
  other: {
    "next-size-adjust": "100%",
  },
};
//holaa
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <html lang="es" className="scroll-smooth">
        <body
          className={`${inter.className} bg-gradient-to-b from-teal-600 to-teal-700 text-white min-h-screen`}
        >
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
