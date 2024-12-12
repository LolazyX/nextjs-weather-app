'use client'

import Navbar from './components/Navbar';
import Content from "./components/Content";

export default function Home() {
  return (
    <div className="h-fit md:h-full lg:h-full absolute inset-0 -z-20 w-full bg-black bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px]">
      <Navbar />
      <Content/>
    </div>
  );
}