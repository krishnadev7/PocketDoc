import type { Metadata } from "next";
import { Plus_Jakarta_Sans as FontSans, Poppins as FontPoppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "@/components/Navbar";
import { usePathname } from "next/navigation";


// Font settings
const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const fontPoppins = FontPoppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "PocketDoc",
  description: "A Healthcare Management System",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>
) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
            :root {
              --font-sans: ${fontSans.variable};
              --font-poppins: ${fontPoppins.variable};
            }
          `}
        </style>
      </head>
      <body className={cn('min-h-screen theme-background font-sans antialiased ', fontSans.variable, fontPoppins.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Conditionally render Navbar */}
           <Navbar />
          <main>
          {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
