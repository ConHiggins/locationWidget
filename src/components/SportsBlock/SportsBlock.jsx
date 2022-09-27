import { useEffect } from "react";
import { useState } from "react";
import "./SportsBlock.scss";

const SportsBlock = ({ footballMatches }) => {
    const [matchIndex, setMatchIndex] = useState(0);

    const updateMatchIndex = (dir, arr) => {
        if (matchIndex >= arr?.length - 1 && dir == 1) {
            setMatchIndex(0);
        } else if (matchIndex <= 0 && dir == -1) {
            setMatchIndex(arr?.length - 1);
        } else {
            setMatchIndex(matchIndex + dir);
        }
    };

    const footballCarousel = footballMatches?.map((fm) => {
        return (
            <div className="football-block">
                <h2>{fm.match}</h2>
                <h2>{fm.start.substring(11, 16)}</h2>
                <h3>{fm.stadium}</h3>
                <h4>{fm.tournament}</h4>
            </div>
        );
    });

    return footballCarousel && footballCarousel.length ? (
        <div className="sports-block">
            <button
                className="sports-block-button"
                onClick={() => {
                    updateMatchIndex(-1, footballCarousel);
                }}
            >
                {" "}
                {"<"}{" "}
            </button>

            {footballCarousel[matchIndex]}
            <button
                className="sports-block-button"
                onClick={() => {
                    updateMatchIndex(1, footballCarousel);
                }}
            >
                {" "}
                {">"}{" "}
            </button>
        </div>
    ) : (
        <div></div>
    );
};

export default SportsBlock;
