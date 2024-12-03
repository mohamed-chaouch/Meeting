import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/toaster";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meeting",
  description: "Meet your friends here",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-2`}>
        <GoogleOAuthProvider clientId="793717333452-5et403b4cdif3i5jj4mjnokt2r58g063.apps.googleusercontent.com">
          {children}
          <Toaster />
        </GoogleOAuthProvider>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </body>
    </html>
  );
}
