import React, { useEffect, useState } from "react";
import { getAllTriviaGames } from "../../modules/triviaGameManager";
import TriviaGame from "./TriviaGame";
import "./triviaGame.css"

const TriviaGameList = () => {
    const [triviaGames, setTriviaGame] = useState([]);

    const getTrivia = () => {
        getAllTriviaGames().then((triviaGames) => {
            setTriviaGame(triviaGames);

        });
    };

    useEffect(() => {
        getTrivia();
    }, []);

    return (
        <div className="triviaContainer">
            <div className="row justify-content-center">
                <div className="title">
                    ALL TRIVIA GAMES
                </div>
                {triviaGames.map((triviaGame) => (
                    <TriviaGame triviaGame={triviaGame} key={triviaGame.id} update={getTrivia} />
                ))}
            </div>
        </div>

    );
};
export default TriviaGameList;