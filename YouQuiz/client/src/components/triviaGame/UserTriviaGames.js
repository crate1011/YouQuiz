import React, { useEffect, useState } from "react";
import { Button, NavItem } from "reactstrap";
import { getByUserId } from "../../modules/triviaGameManager";
import { NavLink as RRNavLink } from "react-router-dom";
import UserTriviaGame from "./UserTriviaGame";
import "./triviaGame.css"

const UserTriviaGames = () => {
    const [userTriviaGames, setTriviaGame] = useState([]);

    const getTrivia = () => {
        getByUserId().then((userTriviaGames) => {
            setTriviaGame(userTriviaGames);

        });
    };

    useEffect(() => {
        getTrivia();
    }, []);

    return (
        <div className="YourContainer">
            <div className="row justify-content-center">
                <NavItem className="YourTag">
                    YOUR TRIVIA GAMES
                    <Button className="YourButton" tag={RRNavLink} to="/TriviaGame/CreateTrivia">Create Game</Button>
                </NavItem>
                {
                    userTriviaGames.map((usertriviaGame) => (
                        <UserTriviaGame usertriviaGame={usertriviaGame} userTriviaGameName={usertriviaGame.name} userTriviaGameId={usertriviaGame.id} userTriviaGameImage={usertriviaGame.imageUrl} key={usertriviaGame.id} update={getTrivia} />
                    ))}
            </div>
        </div>

    );
};
export default UserTriviaGames;