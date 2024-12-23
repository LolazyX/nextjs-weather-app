import type { Metadata } from "next";
import { Prompt} from 'next/font/google'
import "./globals.css";

const prompt = Prompt({
  subsets: ['thai'],
  weight: ['400']
})

export const metadata: Metadata = {
  title: "Weather",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${prompt.className} antialiased`} >
          {children}
      </body>
    </html>
  );
}
