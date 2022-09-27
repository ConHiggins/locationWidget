import "./WeatherBlock.scss";

const WeatherBlock = ({ condition, conditionIcon, forecast }) => {
    return (
        <div className="weatherblock">
            <img src={conditionIcon} />
            <h1>{condition}</h1>
            <div className="forecast">{forecast}</div>
        </div>
    );
};

export default WeatherBlock;
