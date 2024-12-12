'use client'

import { useState } from "react"
import * as React from "react"
import { cn } from "@/lib/utils"
import { FaSistrix } from "react-icons/fa6";

const Search = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [isFocus, setIsFocus] = useState(true)
    return(
      <div  className={cn(
        `flex h-9 rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors ${isFocus ? "border-white" : "border"} items-center` ,
        className
      )}>
        <div className="h-fit text-lg mr-2">
          <FaSistrix />
        </div>
        
        <input className="bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground md:text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" type={type} ref={ref} {...props} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} autoFocus/>
      </div>
    )
  }
)
Search.displayName = "Search"

export { Search }

// group-focus-visible:outline-none group-focus-visible:ring-1 group-focus-visible:ring-ring 
