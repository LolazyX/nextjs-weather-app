'use client'

import { useState, useEffect } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { getWeatherData } from '../backoffice/getWeatherData';
import WeatherIcon from "./WeatherIcon";
import dateBuild from "../handles/dateBuild";
import Clock from 'react-live-clock';
import { WiStrongWind } from "react-icons/wi";
import { WiCloud } from "react-icons/wi";
import { WiRaindrops } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { WiVolcano } from "react-icons/wi";
import Loading from "./Loading";

type Props = {
    search: any
}

type Data = {
    name: string
    datetime: number
    country: string
    temp: number
    wind_speed: number
    clouds: number
    pressure: number
    humidity: number
    feels_like: number
    icon_id: number
    weather: string
    description: string
    visibility: number
}

export default function Content({search}: Props) {
    const [previousSearch, setPreviousSearch] = useState()
    const [weather, setWeather] =  useState<Data>()
    const initWeather = async () => {
        await getWeatherData(search).then((res) => {
            setPreviousSearch(search)
            setWeather(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (previousSearch != search) {
            initWeather()
        }
    }, [search])

    return (
        <>
        {weather !== undefined ? 
            <div className='mx-6 my-3 grid grid-cols-2 h-[90%] space-x-6 items-center'>
                <div className="text-center space-y-3">
                    <div>
                        <h2 className="text-5xl mt-6 font-semibold ">{`${weather?.name}, ${weather?.country}`}</h2>
                    </div>
                    <div>
                        <Clock date={dateBuild(weather?.datetime)} format={'dddd, MMMM Mo, YYYY, h:mm:ss A'} ticking={true}/>
                    </div>
                    <div className="text-[5rem] flex justify-center">
                        <div>
                            <WeatherIcon id={weather.icon_id} className="text-[12rem] ml-2" text={`${Math.trunc(weather?.temp - 273.15)}°C`}/>
                        </div>
                    </div>
                    <div>
                        {`${weather?.weather} (${weather.description})`}
                    </div>
                    <div>
                        Feel like {`${Math.trunc(weather?.feels_like - 273.15)}°C`}
                    </div>
                    
                </div>
                
                <div className="flex items-center">
                    
                        <div className="grid grid-rows-3">
                            <div className="grid grid-cols-2 px-6 py-3 space-x-6">
                                <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-80" gradientColor={"#6b7280"} >
                                    <div className="flex justify-center items-center">
                                        <WiStrongWind className="text-4xl mr-3"/> {Math.trunc(weather?.wind_speed)} km/s
                                    </div>
                                </MagicCard>
                                <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-80" gradientColor={"#6b7280"} >
                                    <div className="flex justify-center items-center">
                                        <WiCloud className="text-4xl mr-3"/> {weather?.clouds} %
                                    </div>
                                </MagicCard>
                            </div>
                            <div className="grid grid-cols-2 px-6 py-3 space-x-6">
                                <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-80" gradientColor={"#6b7280"}>
                                    <div className="flex justify-center items-center">
                                        <WiRaindrops className="text-6xl mr-3"/> {weather?.pressure} hPa
                                    </div>
                                </MagicCard>
                                <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-80" gradientColor={"#6b7280"}>
                                    <div  className="flex justify-center items-center">
                                        <WiThermometer className="text-3xl mr-3"/> {weather?.humidity} %
                                    </div>
                                </MagicCard>
                            </div>
                            <div className="px-6 py-3 flex justify-center items-center">
                                <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-80" gradientColor={"#6b7280"}>
                                    <div className="flex justify-center items-center">
                                        <WiVolcano  className="text-3xl mr-5"/> {weather?.visibility / 1000} km
                                    </div>
                                </MagicCard>
                            </div>
                        </div>
                </div>
            </div>
            :
            <Loading />
        }
       </>
    )
}