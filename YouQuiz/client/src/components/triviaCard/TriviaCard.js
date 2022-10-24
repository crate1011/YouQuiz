import React, { useState } from "react";
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom"
import { deleteTriviaCard } from "../../modules/TriviaCardManager";


const TriviaCard = ({ triviaCard, update, }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const deleteButton = (id) => {
        deleteTriviaCard(id)
            .then(toggle)
            .then(update)
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
                        <Button id="editButton" tag={RRNavLink} to='/triviaCard/edit'>EDIT</Button>
                        <button outline onClick={toggle}
                            className="deleteButton">DELETE</button>
                    </div>
                </section>
                <Modal isOpen={modal} toggle={toggle} {...triviaCard}>
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