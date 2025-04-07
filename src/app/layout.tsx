import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import "antd/dist/reset.css"; // AntD reset CSS
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Traya Questionnaire",
  description: "Personalized Hair Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <StyledComponentsRegistry>
        {children}
      </StyledComponentsRegistry>
      </body>
    </html>
  );
}
