import { Inter } from "next/font/google";
import NavBar from "./components/navbar";
import { NextAuthProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog Model",
  description: "A simple blog model using Next.js and MySQL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        <div>
          <NavBar />
          {children}
        </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
