import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
    const [userCoords, setUserCoords] = useState("");
    const [userArea, setUserArea] = useState("");
    const [weatherData, setWeatherData] = useState("");

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
                `http://api.weatherapi.com/v1/current.json?key=${key}&q=${userCoords}`
            );
            if (!weatherResponse.ok) {
                throw new Error(weatherResponse.status + " error with request");
            }
            const data = await weatherResponse.json();
            console.log(data);
            setUserArea(data.location.name);
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
            <h1>
                {userCoords} <br /> {userArea}
            </h1>
            <h1>{weatherData}</h1>
            <button onClick={getUserCoords}>Get my location</button>
            <button onClick={fetchWeather}>Get weather</button>
        </div>
    );
}

export default App;
