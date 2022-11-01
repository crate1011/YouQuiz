import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import "./triviaGame.css"

const TriviaGame = ({ triviaGame }) => {

    const navigate = useNavigate()

    return (
        <Card
            style={{
                width: '18rem'
            }}
        >
            <img
                alt="Sample"
                src={triviaGame.imageUrl}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {triviaGame?.name}
                </CardTitle>

                <Button className="btn btn-warning" onClick={() => { navigate(`/TriviaGame/${triviaGame.id}`) }}>
                    DETAILS
                </Button>
            </CardBody>
        </Card>
    )
}

export default TriviaGame;