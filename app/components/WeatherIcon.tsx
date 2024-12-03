import React from 'react'
import { WiStormShowers } from "react-icons/wi";
import { WiShowers } from "react-icons/wi";
import { WiRain } from "react-icons/wi";
import { WiSnow } from "react-icons/wi";
import { WiSnowflakeCold } from "react-icons/wi";
import { WiSolarEclipse } from "react-icons/wi";
import { WiCloud } from "react-icons/wi";

type Props = {
    id: number
    className: string
    text: string
}

export default function WeatherIcon({id, className, text}: Props) {
    //Group 2xx: Thunderstorm
    if (`${id}`[0] == '2') {
        return (
            <span><WiStormShowers className={className}/> {text}</span>
            
        )
    //Group 3xx: Drizzle
    } else if (`${id}`[0] == '2') {
        return (
            <span><WiShowers className={className}/> {text}</span>
           
        )
    //Group 5xx: Rain
    } else if (`${id}`[0] == '2') {
        return (
            <span><WiRain className={className}/> {text}</span>
            
        )
    //Group 6xx: Snow
    } else if (`${id}`[0] == '2') {
        return (
            <span><WiSnow className={className}/> {text}</span>
            
        )
    //Group 7xx: Atmosphere
    } else if (`${id}`[0] == '2') {
        return (
            <span><WiSnowflakeCold className={className}/> {text}</span>
            
        )
    //Group 800: Clear
    } else if (`${id}` == '800') {
        return (
            <span><WiSolarEclipse className={className}/> {text}</span>
            
        )
    //Group 80x: Clouds
    } else if (`${id}`[0] == '8') {
        return (
            <div><WiCloud className={className}/>{text}</div>
            
        )
    } 

    

    

    
    
    

    

    //Group 80x: Clouds
    
}