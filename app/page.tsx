'use client'

import { useState, useEffect } from "react";
import Link from 'next/link'

//For Navbar
import { Separator } from "@/components/ui/separator"
import { Search } from "@/components/ui/search"
import { RainbowButton } from "@/components/ui/rainbow-button";
import RippleButton from "@/components/ui/ripple-button";
import { WiFog } from "react-icons/wi";
import { FaGithub } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import Content from "./components/Content";
import { cityWords } from "@/lib/cityWords";

export default function Home() {
  const [search, setSearch] = useState("")
  const [searchSubmit, setSearchSubmit] = useState("Thailand")
  const [activeSearch, setActiveSearch] = useState<string[]>([])

  const handleSearch = (e: any) => {
    if (e.target.value == '') {
      setActiveSearch([])
      setSearch('')
      return false
    }

    setSearch(e.target.value)
    setActiveSearch(cityWords.filter(w => (w.toLowerCase()).includes(search.toLowerCase())).slice(0, 8));
  }

  const onKeyDown = (e: any) => {
    if(e.key == 'Enter'){
        setActiveSearch([])
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
        <div className="grid grid-cols-2 px-8 py-4 bg-black">
          <div className="flex items-center cursor-pointer">
            <WiFog className="text-3xl h-fit"/> 
            <h1 className="text-xl font-bold">Weather</h1>
          </div>
          <div className="flex justify-end items-center space-x-3">
            <div>
              <Search type="text" placeholder="Search" value={search} onChange={(e) => handleSearch(e)} onKeyDown={(e) => onKeyDown(e)} onBlur={() => setActiveSearch([])}/>
              { activeSearch.length > 0 ? (
                <div className="relative z-20">
                  <div className="absolute -top-2 px-3 py-4  bg-black border-x border-b border-white w-full rounded-b-xl flex flex-col shadow-xl">
                    { activeSearch.map((data: string, index: number) => (
                      <span key={data + index} className="cursor-pointer" onClick={()=>{
                        setActiveSearch([])
                        setSearchSubmit(data)
                        setSearch("")
                      }}>
                        {data}
                        {index != (activeSearch.length - 1) ? (
                          <Separator className="my-2"/>
                        ) : ""}
                      </span>
                    ))}
                  </div>
                </div> 
              ) : ""}   
            </div>
            <div>
            <Link href="https://github.com/LolazyX/nextjs-weather-app" target="_blank">
              <RainbowButton className="font-semibold h-full py-2">
                <div><FaGithub className="text-lg mr-1"/></div>
                <div className="md:text-sm">
                  Github
                </div>
              </RainbowButton>
            </Link>
            </div>
          </div>
        </div>
        <Separator/>
        {/** Content */}
        <Content search={searchSubmit}/>
      </div>
      {/** Background */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-black bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </div>
  );
}
