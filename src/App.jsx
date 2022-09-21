import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
    const [userCoords, setUserCoords] = useState();
    const [weatherData, setWeatherData] = useState();

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

    useEffect(() => {
        if (userCoords) {
            fetchWeather();
        }
    }, [userCoords]);

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
                </>
            )}
            <button onClick={getUserCoords}>Get weather near me</button>
        </div>
    );
}

export default App;
