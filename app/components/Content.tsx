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
import Infomation from "./Infomation";

type Props = {
    search: string
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
    const [previousSearch, setPreviousSearch] = useState('')
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

    if (weather) {
        return(
            <div className='mx-6 my-3 grid grid-cols-2 h-[90%] space-x-6 items-center'>
                <div className="text-center space-y-3">
                    <div>
                        <h2 className="text-5xl font-semibold cursor-default">{`${weather?.name}, ${weather?.country}`}</h2>
                    </div>
                    <div>
                        <Clock date={dateBuild(weather?.datetime)} format={'dddd, MMMM Mo, YYYY, h:mm:ss A'} ticking={true}/>
                    </div>
                    <div className="text-[5rem] flex justify-center cursor-default">
                        <div>
                            <WeatherIcon id={weather.icon_id} className="text-[12rem] ml-2" text={`${Math.trunc(weather?.temp - 273.15)}°C`}/>
                        </div>
                    </div>
                    <div className="cursor-default">
                        {`${weather?.weather} (${weather.description})`}
                    </div>
                    <div className="cursor-default">
                        Feel like {`${Math.trunc(weather?.feels_like - 273.15)}°C`}
                    </div>
                </div>
                <div className="flex items-center">
                        <div className="grid grid-rows-3">
                            <div className="grid grid-cols-2 px-6 py-3 space-x-6">
                                <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-80" gradientColor={"#6b7280"} >
                                    <div className="flex justify-center items-center cursor-default">
                                        <WiStrongWind className="text-4xl mr-3"/> {Math.trunc(weather?.wind_speed)}km/s
                                        <Infomation className="ml-3" text="Wind speed"/>
                                    </div>
                                </MagicCard>
                                <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-80" gradientColor={"#6b7280"} >
                                    <div className="flex justify-center items-center cursor-default">
                                        <WiCloud className="text-4xl mr-3"/> {weather?.clouds}%
                                        <Infomation className="ml-3" text="Cloudiness"/>
                                    </div>
                                </MagicCard>
                            </div>
                            <div className="grid grid-cols-2 px-6 py-3 space-x-6">
                                <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-80" gradientColor={"#6b7280"}>
                                    <div className="flex justify-center items-center cursor-default">
                                        <WiRaindrops className="text-5xl mr-3"/> {weather?.pressure}hPa
                                        <Infomation className="ml-3" text="Pressure"/>
                                    </div>
                                </MagicCard>
                                <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-80" gradientColor={"#6b7280"}>
                                    <div  className="flex justify-center items-center cursor-default">
                                        <WiThermometer className="text-3xl mr-3"/> {weather?.humidity}%
                                        <Infomation className="ml-3" text="Humidity"/>
                                    </div>
                                </MagicCard>
                            </div>
                            <div className="px-6 py-3 flex justify-center items-center">
                                <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-80" gradientColor={"#6b7280"}>
                                    <div className="flex justify-center items-center cursor-default">
                                        <WiVolcano  className="text-3xl mr-5"/> {weather?.visibility / 1000}km
                                        <Infomation className="ml-3" text="Visibility"/>
                                    </div>
                                </MagicCard>
                            </div>
                        </div>
                </div>
            </div>
        )
    } else {
        return(
            <Loading />
        )
    }
}