import React from 'react'

type Props = {}

export default function Loading({}: Props) {
  return (
    <div>
        <div className="absolute inset-0 z-10 h-full w-full bg-black bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px] flex justify-center items-center">
            <h3 className='text-xl'>Loading...</h3>
        </div>
        
    </div>
  )
}