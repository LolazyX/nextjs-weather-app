export async function getWeatherData(cityName: string) {
    const api = process.env.NEXT_PUBLIC_OPEN_WEATHER_API
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}`)

    if (!res.ok) {
        throw new Error(api)
    }

    const {name, dt, sys, main, weather, wind, clouds, visibility } = await res.json()
    return {
        name,
        datetime: dt,  
        country: sys.country,
        temp: main.temp,
        wind_speed: wind.speed,
        clouds: clouds.all,
        pressure: main.pressure, //ความดันบรรยากาศต่อระดับน้ําทะเล
        humidity: main.humidity, // humidity
        visibility,
        icon_id: weather[0].id, 
        weather: weather[0].main,
        description: weather[0].description,
        feels_like: main.feels_like,
    }
}