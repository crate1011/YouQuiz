import React, { useEffect, useInsertionEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { getTriviaGameById } from "../../modules/triviaGameManager";


const TriviaGameDetails = () => {
    const { triviaGameId } = useParams();
    const [gameDetail, setGameDetails] = useState({});
    const getGameDetails = (id) => {
        getTriviaGameById(id).then((gameDetail) => {
            setGameDetails(gameDetail);
        });
    };

    useEffect(() => {
        getGameDetails(triviaGameId);
    }, []);

    return (
        <Card>
            <h2>Trivia Game Details</h2>
            <CardBody>
                <div className="container">
                    <div className="row justify-content-center">
                        <p>
                            <img src={gameDetail.imageUrl} />
                        </p>
                        <p>Name: {gameDetail.name}</p>
                        <p>UserProfileId: {gameDetail.userProfileId}</p>
                        <p>Id: {gameDetail.id}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
export default TriviaGameDetails;