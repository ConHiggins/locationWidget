import "./WeatherBlock.scss";

const WeatherBlock = ({
    condition,
    conditionIcon,
    temp,
    forecast,
    sunrise,
    sunset,
    moonrise,
    moonset,
}) => {
    return (
        <>
            <div className="weatherblock">
                <img src={conditionIcon} />
                <h2>{temp}&#176;</h2>
                <h1>{condition}</h1>
                <div className="forecast">{forecast}</div>
                <div className="astroblock-container">
                    <div className="astroblock astroblock-sunrise">
                        <div className="astroblock-bg bg-sunrise"></div>
                        <div className="sphere sphere-sun sphere-up"></div>
                        <h2>
                            Sunrise: <br />
                            {sunrise}
                        </h2>
                    </div>
                    <div className="astroblock astroblock-sunset">
                        <div className="astroblock-bg bg-sunset"></div>
                        <div className="sphere sphere-sun sphere-down"></div>
                        <h2>
                            Sunset: <br />
                            {sunset}
                        </h2>
                    </div>
                    <div className="astroblock astroblock-moonrise">
                        <div className="astroblock-bg bg-moonrise"></div>
                        <div className="sphere sphere-moon sphere-up"></div>
                        <h2>
                            Moonrise: <br />
                            {moonrise}
                        </h2>
                    </div>
                    <div className="astroblock astroblock-moonset">
                        <div className="astroblock-bg bg-moonset"></div>
                        <div className="sphere sphere-moon sphere-down"></div>
                        <h2>
                            Moonset: <br />
                            {moonset}
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeatherBlock;
