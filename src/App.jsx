import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import WeatherBlock from "./components/WeatherBlock/WeatherBlock";
import SportsBlock from "./components/SportsBlock/SportsBlock";

function App() {
    const [acceptedLocationTrack, setAcceptedLocationTrack] = useState(false);
    const [userCoords, setUserCoords] = useState();
    const [weatherData, setWeatherData] = useState();
    const [forecastData, setForecastData] = useState();
    const [forecast, setForecast] = useState();
    const [sportsData, setSportsData] = useState();

    const key = process.env.REACT_APP_API_KEY;

    const showPosition = (position) => {
        setUserCoords(
            `${position.coords.latitude},${position.coords.longitude}`
        );
    };

    const getUserCoords = () => {
        setAcceptedLocationTrack(true);
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            setUserCoords("Geolocation is not supported by this browser");
        }
    };

    const fetchWeather = async () => {
        try {
            const weatherResponse = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${key}&q=${userCoords}`
            );
            if (!weatherResponse.ok) {
                throw new Error(weatherResponse.status + " error with request");
            }
            setWeatherData(await weatherResponse.json());
            console.log(weatherData);
        } catch (error) {
            alert(error.message);
        }
    };

    const fetchForecast = async () => {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${userCoords}`
            );
            if (!response.ok) {
                throw new Error(response.status + " error with request");
            }
            setForecastData(await response.json());

            console.log(forecastData);
        } catch (error) {
            alert(error.message);
        }
    };

    const fetchSports = async () => {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/sports.json?key=${key}&q=${userCoords}`
            );
            if (!response.ok) {
                throw new Error(response.status + " error with request");
            }
            setSportsData(await response.json());
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        if (userCoords) {
            fetchWeather();
            fetchForecast();
            fetchSports();

            console.log(forecast);
            console.log(sportsData);
        }
    }, [userCoords]);

    useEffect(() => {
        if (forecastData) {
            const startTime =
                forecastData?.forecast.forecastday[0].hour.findIndex((h) => {
                    const d = new Date();
                    return h.time.substring(11, 13) > d.getHours();
                });

            setForecast(
                forecastData?.forecast.forecastday[0].hour
                    .splice(startTime, startTime + 10)
                    .map((d) => {
                        return (
                            <div className="forecast-bit">
                                <img
                                    src={d.condition.icon}
                                    key={d.time_epoch}
                                />
                                <p>{d.time.substring(11, 16)}</p>
                            </div>
                        );
                    })
            );
        }
    }, [forecastData]);

    return (
        <div className="App">
            {acceptedLocationTrack && (
                <>
                    <h1>
                        {userCoords} {weatherData?.location.name}
                        {","}
                        {weatherData?.location.region}
                    </h1>
                    <div className="blocks-container">
                        <WeatherBlock
                            conditionIcon={weatherData?.current.condition.icon}
                            condition={weatherData?.current.condition.text}
                            temp={weatherData?.current.temp_c}
                            forecast={forecast}
                            sunrise={
                                forecastData?.forecast.forecastday[0].astro
                                    .sunrise
                            }
                            sunset={
                                forecastData?.forecast.forecastday[0].astro
                                    .sunset
                            }
                            moonrise={
                                forecastData?.forecast.forecastday[0].astro
                                    .moonrise
                            }
                            moonset={
                                forecastData?.forecast.forecastday[0].astro
                                    .moonset
                            }
                        />
                        <SportsBlock footballMatches={sportsData?.football} />
                    </div>
                    <button onClick={console.log(sportsData)}>check</button>
                </>
            )}
            {!acceptedLocationTrack && (
                <>
                    <h1>
                        We need to track your location to fetch information for
                        your area
                    </h1>
                    <button className="start-button" onClick={getUserCoords}>
                        I'm okay with this
                    </button>
                </>
            )}
        </div>
    );
}

export default App;
