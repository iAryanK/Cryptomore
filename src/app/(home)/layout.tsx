import { ThemeProvider } from "@/components/providers/theme-provider";
import LeftSidebar from "@/components/home/LeftSidebar";
import RightSidebar from "@/components/home/RightSidebar";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Image from "next/image";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="mx-auto flex h-screen max-w-7xl flex-col items-center justify-center gap-5 py-2 md:flex-row md:py-10">
            <div className="flex w-full items-center justify-between px-2 md:hidden">
              <div className="flex items-center gap-2 font-geistSans text-2xl font-extrabold uppercase text-zinc-300 dark:text-zinc-700 md:text-3xl">
                <Image
                  src="/logo.png"
                  alt="Cryptomore"
                  width={100}
                  height={100}
                  className="h-6 w-6"
                />
                Cryptomore
              </div>
              <ThemeToggle />
            </div>
            <div className="h-full w-full max-md:h-fit md:w-[6vw]">
              <LeftSidebar />
            </div>
            <div className="h-full w-full rounded-lg max-md:px-2 md:w-[60vw]">
              {children}
            </div>
            <div className="h-full w-full rounded-lg px-2 md:w-[30vw]">
              <RightSidebar />
            </div>
          </main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
