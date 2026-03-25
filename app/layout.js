import { Geist, Geist_Mono, Caveat } from 'next/font/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

// Caveat is a variable font, so we don't need to specify weight
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "WildBluff Tours | Bluff Beach · Bocas del Toro",
  description: "Guided rainforest & beach nature tours with Luis — a native Ngobe guide from Bluff Island, Panama.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className={`${geistSans.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}