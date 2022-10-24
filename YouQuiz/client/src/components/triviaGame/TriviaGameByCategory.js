import React, { useEffect, useInsertionEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { getByCategoryId } from "../../modules/triviaGameManager";
import TriviaGame from "./TriviaGame";


const TriviaGameByCategory = () => {
    const { GameId } = useParams();
    const [triviaGames, setGames] = useState([]);

    const getGameByCat = (id) => {
        getByCategoryId(id).then((triviaGames) => {
            setGames(triviaGames);
        });
    };

    useEffect(() => {
        getGameByCat(GameId);
    }, []);

    return (
        <Card>
            <h2>Trivia Games</h2>
            <CardBody>
                <div className="container">
                    <div className="row justify-content-center">
                        <h1 className="catPageHeader">Trivia Games</h1>
                        {
                            triviaGames.map((triviaGame) => (
                                <TriviaGame triviaGame={triviaGame} key={triviaGame.id} />
                            ))
                        }

                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
export default TriviaGameByCategory;