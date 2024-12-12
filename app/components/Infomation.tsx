'use client'

import {useState} from 'react'
import { BsExclamationCircle } from "react-icons/bs";

type Props = {
    className: string;
    text: string;
}

export default function Infomation({className, text}: Props) {
    const [isHover, setIsHover] = useState(false);

    return (
        <div className={className + " cursor-pointer " + (isHover ? "opacity-100" : "opacity-40")} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} >
            <BsExclamationCircle />
            <div className={(isHover ? "" : "hidden") + " absolute -top-8 inset-0 h-fit text-center px-3 rounded-xl bg-black border shadow-lg shadow-black "}>
                {text}
            </div>
        </div>
    )
}