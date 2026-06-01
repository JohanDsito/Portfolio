import "@/src/app/globals.css";
import { LenisProvider } from "@/src/components/LenisProvider";
import { ThemeProvider } from "@/src/components/ThemeContext";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import localFont from "next/font/local";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Johan Delgado — Ingeniero de Software",
  description:
    "Portafolio de Johan Delgado, estudiante de Ingeniería de Software, desarrollador y músico de Pasto.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/*
          Apply saved theme before first paint to avoid a flash.
          This runs synchronously before React hydrates.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${bricolage.variable} ${figtree.variable} ${geistMono.variable} antialiased bg-surface text-ink`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
