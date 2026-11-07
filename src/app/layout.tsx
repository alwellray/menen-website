import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "../components/theme-provider";

export const metadata: Metadata = {
  title: "MANEN | Facility & Project Solutions in Lagos",
  description: "Engineering-led project management, facility management, property management and engineering solutions in Lagos, Nigeria.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-NG" suppressHydrationWarning><body><ThemeProvider>{children}</ThemeProvider></body></html>;
}
