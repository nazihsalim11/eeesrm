import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "BEEE Notes — SRM EEE Learning Platform",
  description:
    "Modern study notes for Basic Electrical and Electronics Engineering (21EES101T) with formulas, flashcards, and structured learning organized by unit and topic.",
  keywords: ["EEE", "BEEE", "SRM", "electrical engineering", "notes", "flashcards"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
