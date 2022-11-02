import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom"
import { deleteTriviaCard } from "../../modules/TriviaCardManager";


const TriviaCard = ({ triviaCard, update }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const navigate = useNavigate()

    const deleteButton = (id) => {
        deleteTriviaCard(id)
            .then(() => {
                toggle()
                update()
            })
    }

    return (
        <Card>
            <CardBody id="triv-cardBody">
                <section className="trivContainer">
                    <div className="trivNameContainer">
                        <span className="tagName">Question: {triviaCard.question}</span>
                    </div>
                    <div className="trivNameContainer">
                        <span className="tagName">Wrong Answer: {triviaCard.wrongAnswerOne}</span>
                    </div>
                    <div className="trivNameContainer">
                        <span className="tagName">Wrong Answer: {triviaCard.wrongAnswerTwo}</span>
                    </div>
                    <div className="trivNameContainer">
                        <span className="tagName">Wrong Answer: {triviaCard.wrongAnswerThree}</span>
                    </div>
                    <div className="trivNameContainer">
                        <span className="tagName">Correct Answer: {triviaCard.answer}</span>
                    </div>
                </section>
            </CardBody>
        </Card>
    )
}

export default TriviaCard;