import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import "./triviaGame.css"

const TriviaGame = ({ triviaGame }) => {

    const navigate = useNavigate()

    return (
        <Card>
            <CardBody id="triv-cardBody">
                <section className="trivContainer">
                    <div className="trivNameContainer">
                        <span className="tagName">{triviaGame.name}</span>
                    </div>
                    <div className="buttonContainer">
                    </div>
                </section>
                <button className="trivButton" onClick={() => { navigate(`/TriviaGame/${triviaGame.id}`) }}>
                    DETAILS
                </button>
            </CardBody>
        </Card>
    )
}

export default TriviaGame;