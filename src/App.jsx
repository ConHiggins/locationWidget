import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
    const [userCoords, setUserCoords] = useState();
    const [weatherData, setWeatherData] = useState();
    const [forecastData, setForecastData] = useState();
    const [forecast, setForecast] = useState();

    const key = process.env.REACT_APP_API_KEY;

    const showPosition = (position) => {
        setUserCoords(
            `${position.coords.latitude},${position.coords.longitude}`
        );
    };

    const getUserCoords = () => {
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

    useEffect(() => {
        if (userCoords) {
            fetchWeather();
            fetchForecast();

            console.log(forecast);
        }
    }, [userCoords]);

    useEffect(() => {
        if (forecastData) {
            setForecast(
                forecastData?.forecast.forecastday[0].hour.map((d) => {
                    return <img src={d.condition.icon} key={d.time_epoch} />;
                })
            );
        }
    }, [forecastData]);

    return (
        <div className="App">
            {weatherData && (
                <>
                    <h1>
                        {userCoords} <br /> {weatherData?.location.name}, <br />{" "}
                        {weatherData?.location.region}
                    </h1>
                    <img src={weatherData?.current.condition.icon} />
                    <h1>{weatherData?.current.condition.text}</h1>
                    <h1>{forecast}</h1>
                </>
            )}
            <button onClick={getUserCoords}>Get weather near me</button>
        </div>
    );
}

export default App;
