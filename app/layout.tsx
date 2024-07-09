import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meeting",
  description: "Meet your friends here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <body className={`${inter.className} bg-dark-2`}>{children}</body>
    //   <script src="https://accounts.google.com/gsi/client" async defer></script>
    // </html>
    <html lang="en">
    <body className={`${inter.className} bg-dark-2`}>
      <GoogleOAuthProvider clientId="793717333452-5et403b4cdif3i5jj4mjnokt2r58g063.apps.googleusercontent.com">
        {children}
      </GoogleOAuthProvider>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
    </body>
  </html>
  );
}
