import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GymHub - AI-Powered Fitness Companion",
  description: "A one-stop solution for your fitness and gym-oriented problems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          bg-white text-black 
          ${geistSans.variable} ${geistMono.variable} 
          antialiased min-h-screen
        `}
      >
        {children}
      </body>
    </html>
  );
}
