import React, { useEffect, useInsertionEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardBody, NavItem } from "reactstrap";
import { getTriviaGameById } from "../../modules/triviaGameManager";
import { NavLink as RRNavLink } from "react-router-dom";

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
            <NavItem className="addcardContainer">
                <div className="addcarContainer">Create New Trivia Card</div>
                <Button id="createButton" tag={RRNavLink} to="/TriviaCard/CreateTriviaCard">Create Trivia Card</Button>
            </NavItem>
        </Card>

    );
};
export default TriviaGameDetails;