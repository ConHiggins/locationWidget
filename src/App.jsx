import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import WeatherBlock from "./components/WeatherBlock/WeatherBlock";
import SportsBlock from "./components/SportsBlock/SportsBlock";

function App() {
    const [acceptedLocationTrack, setAcceptedLocationTrack] = useState(false);
    const [userCoords, setUserCoords] = useState();
    let lat, long;

    const [weatherData, setWeatherData] = useState();
    const [forecastData, setForecastData] = useState();
    const [forecast, setForecast] = useState();

    const [sportsData, setSportsData] = useState();

    const key = process.env.REACT_APP_API_KEY;

    const d = new Date();
    let greeting = "";

    if (d.getHours() <= 11) {
        greeting = "Good morning!";
    } else if (d.getHours() > 11 && d.getHours() < 18) {
        greeting = "Good afternoon!";
    } else {
        greeting = "Good evening,";
    }

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

    const updateCoords = (lat, long) => {
        setUserCoords(`${lat},${long}`);
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
                    <div>
                        <h1 className="location-data">
                            {userCoords} {weatherData?.location.name}
                            {","}
                            {weatherData?.location.region}
                        </h1>
                        <fieldset>
                            <legend>Set latitude:</legend>
                            <input
                                type="number"
                                onChange={(e) => {
                                    lat = e.target.value;
                                }}
                            />
                        </fieldset>
                        <fieldset>
                            <legend>Set longitude:</legend>
                            <input
                                type="number"
                                onChange={(e) => {
                                    long = e.target.value;
                                }}
                            />
                        </fieldset>
                        <button
                            onClick={() => {
                                updateCoords(lat, long);
                            }}
                        >
                            Update location
                        </button>
                        <button
                            onClick={() => {
                                getUserCoords();
                            }}
                        >
                            Reset to my location
                        </button>
                    </div>
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
                </>
            )}
            {!acceptedLocationTrack && (
                <>
                    <h1>
                        {greeting} <br /> We need to track your location to
                        fetch information for your area
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
