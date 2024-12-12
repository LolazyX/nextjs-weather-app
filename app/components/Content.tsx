'use client'

import { useState, useEffect } from "react";
import { useSearchStore } from "./Navbar";
import Loading from "./Loading";
import { MagicCard } from "@/components/ui/magic-card";
import { getWeatherData } from '../../backoffice/getWeatherData';
import WeatherIcon from "./WeatherIcon";
import dateBuild from "../../lib/dateBuild";
import { WiStrongWind } from "react-icons/wi";
import { WiCloud } from "react-icons/wi";
import { WiRaindrops } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { WiVolcano } from "react-icons/wi";

type Data = {
    name: string;
    datetime: number;
    timezone: number;
    country: string;
    temp: number;
    wind_speed: number;
    clouds: number;
    pressure: number;
    humidity: number;
    feels_like: number;
    icon_id: number;
    weather: string;
    description: string;
    visibility: number;
}

export default function Content() {
    const searchSubmit = useSearchStore((state) => state.searchSubmit);

    const [previousSearch, setPreviousSearch] = useState('')
    const [weather, setWeather] =  useState<Data>()
    const initWeather = async () => {
        await getWeatherData(searchSubmit).then((res) => {
            setPreviousSearch(searchSubmit)
            setWeather(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (previousSearch != searchSubmit) {
            initWeather()
        }
    }, [searchSubmit])

    if (weather) {
        return(
            <div className='px-4 py-4 lg:px-8 lg:py-4 grid lg:grid-cols-2 lg:h-[90%] space-y-4 lg:space-y-0 lg:space-x-6 items-center h-fit'>
                <div className="text-center space-y-2 lg:space-y-3">
                    <div>
                        <h2 className="text-5xl font-semibold cursor-default">{`${weather?.name}, ${weather?.country}`}</h2>
                    </div>
                    <div>
                        {dateBuild()}
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
                <div className="flex items-center h-fit">
                    <div className="grid lg:grid-rows-3 w-full space-y-2 lg:space-y-3">
                        <div className="grid grid-cols-2 items-center lg:px-6 space-x-2 lg:space-x-0">
                            <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-auto lg:w-80" gradientColor={"#6b7280"} >
                                <div className="flex justify-center items-center cursor-default">
                                    <WiStrongWind className="text-2xl lg:text-4xl mr-3"/> {Math.trunc(weather?.wind_speed)}km/s 
                                </div>
                                <p className="opacity-40 text-center">(Wind speed)</p>
                            </MagicCard>
                            <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-auto lg:w-80" gradientColor={"#6b7280"} >
                                <div className="flex justify-center items-center cursor-default">
                                    <WiCloud className="text-2xl lg:text-4xl mr-3"/> {weather?.clouds}%
                                </div>
                                <p className="opacity-40 text-center">(Cloudiness)</p>
                            </MagicCard>
                        </div>
                        <div className="grid grid-cols-2 items-center lg:px-6 space-x-2 lg:space-x-0">
                            <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-auto lg:w-80" gradientColor={"#6b7280"}>
                                <div className="flex justify-center items-center cursor-default">
                                    <WiRaindrops className="text-3xl lg:text-5xl mr-3"/> {weather?.pressure}hPa
                                </div>
                                <p className="opacity-40 text-center">(Pressure)</p>
                            </MagicCard>
                            <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 w-auto lg:w-80" gradientColor={"#6b7280"}>
                                <div  className="flex justify-center items-center cursor-default">
                                    <WiThermometer className="text-2xl lg:text-3xl mr-3"/> {weather?.humidity}%
                                </div>
                                <p className="opacity-40 text-center">(Humidity)</p>
                            </MagicCard>
                        </div>
                        <div className="lg:px-6 lg:py-3 flex justify-center items-center">
                            <MagicCard className="flex-col items-center justify-center shadow-2xl whitespace-nowrap h-32 lg:w-80 border rounded-xl" gradientColor={"#6b7280"}>
                                <div className="flex justify-center items-center cursor-default">
                                    <WiVolcano  className="text-3xl mr-5"/> {weather?.visibility / 1000}km
                                </div>
                                <p className="opacity-40 text-center">(Visibility)</p>
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