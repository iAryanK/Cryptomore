import { ThemeProvider } from "@/components/providers/theme-provider";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Logo from "@/components/shared/Logo";
import { Toaster } from "@/components/ui/toaster";

export default function OnboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="absolute bottom-5 left-5">
            <ThemeToggle />
          </div>
          <Logo />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
