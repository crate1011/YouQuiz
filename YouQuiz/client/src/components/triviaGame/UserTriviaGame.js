import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteTriviaGame } from "../../modules/triviaGameManager";

const UserTriviaGame = ({ userTriviaGame, update, userTriviaGameName, userTriviaGameId }) => {
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
                        <span className="tagName">{userTriviaGameName}</span>
                    </div>
                    <div className="buttonContainer">
                        <button className="btn btn-warning" onClick={() => { navigate(`/TriviaGame/Edit/${userTriviaGameId}`) }}>
                            edit
                        </button>
                        <button onClick={toggle}
                            className="deleteButton">DELETE</button>
                    </div>
                </section>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Delete Game</ModalHeader>
                    <ModalBody>
                        <>
                            <section className="quickView">
                                <img alt="" src="" width="" height=""></img>
                                <div>Are You Sure You Want To Delete: {userTriviaGameName}</div>
                            </section>
                        </>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                        <Button color="secondary" onClick={() => { deleteButton(userTriviaGameId) }} >
                            Confirm
                        </Button>
                    </ModalFooter>
                </Modal>
                <button className="btn btn-warning" onClick={() => { navigate(`/TriviaGame/${userTriviaGameId}`) }}>
                    DETAILS
                </button>
            </CardBody>
        </Card>
    )
}

export default UserTriviaGame;