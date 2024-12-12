'use client'

import { useState } from "react";
import { create } from "zustand";
import { Separator } from "@/components/ui/separator"
import { Search } from "@/components/ui/search";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from 'next/link';
import { WiFog } from "react-icons/wi";
import { FaGithub } from "react-icons/fa6";
import { cityWords } from "@/lib/cityWords";

type SearchStoreType = {
    searchSubmit: string
    setSearchSubmit: (state: string) => void
}
export const useSearchStore = create<SearchStoreType>()((set) => ({
    searchSubmit: "Thailand",
    setSearchSubmit: (state) => set({ searchSubmit: state }),
}))
export default function Navbar() {
    const [search, setSearch] = useState("");
    const {searchSubmit, setSearchSubmit} = useSearchStore();
    const [activeSearch, setActiveSearch] = useState<string[]>([]);
  
    const handleSearch = (e: any) => {
      if (e.target.value == '') {
        setActiveSearch([]);
        setSearch('');
        return false
      }
  
      const key = e.target.value;
  
      setSearch(key);
      setActiveSearch(cityWords.filter(w => (w.toLowerCase()).includes(key.toLowerCase())).slice(0, 8));
    }
  
    const onKeyDown = (e: any) => {
      if(e.key == 'Enter'){
          setActiveSearch([]);
          setSearchSubmit(search);
          setSearch('');
          console.log(searchSubmit);
      }
    }
  
    return (
        <div className="sticky lg:static top-0 w-full">
            <div className="grid lg:grid-cols-2 px-4 py-2 lg:px-8 lg:py-4 bg-black space-y-2 lg:space-y-2">
                <div className="flex justify-between ">
                    <div className="flex items-center cursor-pointer">
                        <WiFog className="text-3xl h-fit"/> 
                        <h1 className="text-xl font-bold">Weather</h1>
                    </div>
                    <RainbowButton className="font-semibold h-full py-2 lg:hidden">
                        <div><FaGithub className="text-lg mr-1"/></div>
                        <div className="md:text-sm">
                        Github
                        </div>
                    </RainbowButton>
                </div>
                <div className="flex justify-end items-center lg:space-x-3">
                    <div className="grow lg:flex-none">
                        <Search type="text" placeholder="Search" value={search} onChange={(e) => handleSearch(e)} onKeyDown={(e) => onKeyDown(e)} onBlur={() => setActiveSearch([])}/>
                        { activeSearch.length > 0 ? (
                            <div className="relative z-20">
                            <div className="absolute -top-2 px-3 py-4  bg-black border-x border-b border-white w-full rounded-b-xl flex flex-col shadow-xl">
                                { activeSearch.map((data: string, index: number) => (
                                <span key={data + index} className="cursor-pointer" onClick={()=>{
                                    setActiveSearch([]);
                                    setSearchSubmit(data);
                                    setSearch("");
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
                    <RainbowButton className="font-semibold h-full py-2 hidden lg:flex">
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
        </div>
    )
}