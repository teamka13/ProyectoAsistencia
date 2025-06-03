// app/layout.tsx
import { ReactNode } from "react";
import Navbar from "./dashboard/page";
import Header from "../username/components/modules/header";
//import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex h-screen">
        <Navbar></Navbar>
        <div className="flex-1  overflow-y-auto ">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
