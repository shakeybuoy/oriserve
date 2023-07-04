import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Unsplash Photos",
  description: "Made as a test project for Oriserve",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`no-scroll ${inter.className}`}>{children}</body>
    </html>
  );
}
