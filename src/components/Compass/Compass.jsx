import "./Compass.scss";

const Compass = ({ windDir, windSpd, windDeg }) => {
    return (
        <div className="compass-container">
            <h1 className="compass-info">Winds:</h1>
            <div className="compass">
                <div
                    className="compass-arrow"
                    style={{
                        transform: `rotate(${windDeg}deg)`,
                    }}
                ></div>
                <h1 className="compass-dir N">N</h1>
                <h1 className="compass-dir E">E</h1>
                <h1 className="compass-dir S">S</h1>
                <h1 className="compass-dir W">W</h1>
            </div>
            <div className="compass-info">
                <h2>{windDir}</h2>
                <h2>{windSpd}mph</h2>
            </div>
        </div>
    );
};

export default Compass;
