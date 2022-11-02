import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, NavItem } from "reactstrap";
import { getTriviaGameById } from "../../modules/triviaGameManager";

const UserTriviaGameDetails = () => {
    const { UserTriviaGameId } = useParams();
    const navigate = useNavigate()
    const [gameDetail, setGameDetails] = useState({});
    const getGameDetails = (id) => {
        getTriviaGameById(id).then((gameDetail) => {
            setGameDetails(gameDetail);
        });
    };

    useEffect(() => {
        getGameDetails(UserTriviaGameId);
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
                <button className="Cat" onClick={() => { navigate(`/TriviaCard/CreateTriviaCard/${UserTriviaGameId}`) }}>
                    Create Card
                </button>
            </NavItem>
            <button className="addCat" onClick={() => { navigate(`/TriviaGame/AddTriviaGameCategory/${UserTriviaGameId}`) }}>
                Add Category
            </button>
        </Card>

    );
};
export default UserTriviaGameDetails;