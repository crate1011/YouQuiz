import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteTriviaGame } from "../../modules/triviaGameManager";


const UserTriviaGame = ({ userTriviaGameImage, update, userTriviaGameName, userTriviaGameId }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const navigate = useNavigate()

    const deleteButton = (id) => {
        deleteTriviaGame(id)
            .then(toggle)
            .then(update)
    }

    return (
        <Card
            style={{
                width: '18rem'
            }}
        >
            <img
                alt="Sample"
                src={userTriviaGameImage}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {userTriviaGameName}
                </CardTitle>
                <Button className="btn btn-warning" onClick={() => { navigate(`/TriviaGame/Edit/${userTriviaGameId}`) }}>
                    Edit
                </Button>
                <button onClick={toggle}
                    className="deleteButton">DELETE</button>
            </CardBody>
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
            <button className="btn btn-warning" onClick={() => { navigate(`/UserTriviaGame/${userTriviaGameId}`) }}>
                DETAILS
            </button>
        </Card>
    )
}

export default UserTriviaGame;