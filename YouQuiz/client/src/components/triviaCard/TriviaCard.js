import React, { useState } from "react";
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { NavLink as RRNavLink, useNavigate } from "react-router-dom"
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
                    <div className="buttonContainer">
                        <button className="btn btn-warning" onClick={() => { navigate(`/TriviaCard/GetByTriviaGame/${triviaCard.id}`) }}>
                            edit
                        </button>
                        <button outline onClick={toggle}
                            className="deleteButton">DELETE</button>
                    </div>
                </section>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Delete Card</ModalHeader>
                    <ModalBody>
                        <>
                            <section className="quickView">
                                <img alt="" src="" width="" height=""></img>
                                <div>Are You Sure You Want To Delete: {triviaCard.name}</div>
                            </section>
                        </>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                        <Button color="secondary" onClick={() => { deleteButton(triviaCard.id) }} >
                            Confirm
                        </Button>
                    </ModalFooter>
                </Modal>
            </CardBody>
        </Card>
    )
}

export default TriviaCard;