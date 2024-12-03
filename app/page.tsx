'use client'

import { useState, useEffect } from "react";

//For Navbar
import { Separator } from "@/components/ui/separator"
import { Search } from "@/components/ui/search"
import { RainbowButton } from "@/components/ui/rainbow-button";
import RippleButton from "@/components/ui/ripple-button";
import { WiFog } from "react-icons/wi";
import { FaGithub } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

import Content from "./components/Content";

export default function Home() {
  const [search, setSearch] = useState("")
  const [searchSubmit, setSearchSubmit] = useState("Thailand")

  const onKeyDown = (e: any) => {
    if(e.key == 'Enter'){
        setSearchSubmit(search)
        setSearch('')
      }
  }

  useEffect(() => {
    console.log(search)
  }, [search])

  return (
    <div>
      <div className="h-[100dvh] w-full bg-red">
        {/** Navbar */}
        <div className="grid grid-cols-2 px-6 py-3 bg-black">
          <div className="flex items-center">
            <WiFog className="text-3xl h-fit"/> 
            <h1 className="text-xl font-semibold">Weather</h1>
          </div>
          <div className="flex justify-end items-center space-x-3">
            <div>
             <Search type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => onKeyDown(e)}/>
            </div>
            <div>
              <RippleButton rippleColor="#FFF" className="h-full py-2">
                <FaLocationDot className="text-lg mr-1"/>
              </RippleButton>
            </div>
            <div>
            <RainbowButton className="font-semibold h-full py-2">
              <div><FaGithub className="text-lg mr-1"/></div>
              <div className="md:text-sm">
                Github
              </div>
            </RainbowButton>
            </div>
          </div>
        </div>
        <Separator/>
        {/** Content */}
        <Content search={searchSubmit}/>
      </div>
      {/** Background */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-black bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </div>
  );
}
