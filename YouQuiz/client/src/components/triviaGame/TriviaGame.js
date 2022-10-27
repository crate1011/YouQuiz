import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom"
import { deleteTriviaGame } from "../../modules/triviaGameManager";



const TriviaGame = ({ triviaGame, update, }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const navigate = useNavigate()

    const deleteButton = (id) => {
        deleteTriviaGame(id)
            .then(toggle)
            .then(update)
    }

    return (
        <Card>
            <CardBody id="triv-cardBody">
                <section className="trivContainer">
                    <div className="trivNameContainer">
                        <span className="tagName">{triviaGame.name}</span>
                    </div>
                    <div className="buttonContainer">
                        <button className="btn btn-warning" onClick={() => { navigate(`/TriviaGame/Edit/${triviaGame.id}`) }}>
                            edit
                        </button>
                        <button outline onClick={toggle}
                            className="deleteButton">DELETE</button>
                    </div>
                </section>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Delete Game</ModalHeader>
                    <ModalBody>
                        <>
                            <section className="quickView">
                                <img alt="" src="" width="" height=""></img>
                                <div>Are You Sure You Want To Delete: {triviaGame.name}</div>
                            </section>
                        </>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                        <Button color="secondary" onClick={() => { deleteButton(triviaGame.id) }} >
                            Confirm
                        </Button>
                    </ModalFooter>
                </Modal>
                <button className="btn btn-warning" onClick={() => { navigate(`/TriviaGame/${triviaGame.id}`) }}>
                    DETAILS
                </button>
            </CardBody>
        </Card>
    )
}

export default TriviaGame;