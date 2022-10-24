import React, { useEffect, useInsertionEffect, useState } from "react";
import { Button, NavItem } from "reactstrap";
import { getAllTriviaGames } from "../../modules/triviaGameManager";
import TriviaGame from "./TriviaGame";
import { NavLink as RRNavLink } from "react-router-dom";



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
        <div className="container">
            <div className="row justify-content-center">
                <NavItem className="addTagContainer">
                    <div className="addTagContainer">Create A New Game</div>
                    <Button id="createButton" tag={RRNavLink} to="/">Create Game</Button>
                </NavItem>
                {triviaGames.map((triviaGame) => (
                    <TriviaGame triviaGame={triviaGame} key={triviaGame.id} update={getTrivia} />
                ))}
            </div>
        </div>

    );
};
export default TriviaGameList;