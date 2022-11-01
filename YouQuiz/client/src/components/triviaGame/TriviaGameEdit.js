import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup } from "reactstrap";
import { editTriviaGame, getTriviaGameById } from "../../modules/triviaGameManager";


export const TriviaGameEdit = () => {
    const { triviaGameId } = useParams();
    const navigate = useNavigate()

    const [triviaGame, setTriviaGame] = useState({
        name: "",
        imageUrl: "",
        userProfileId: 0
    })

    const getTriviaGame = () => {
        getTriviaGameById(triviaGameId).then(tg => setTriviaGame(tg))
    }

    useEffect(
        () => {
            getTriviaGame()
        }, []
    )


    const handleCreateButtonClick = (event) => {
        event.preventDefault()

        const gameToSendToApi = {
            id: triviaGame.id,
            name: triviaGame.name,
            imageUrl: triviaGame.imageUrl,
            userProfileId: triviaGame.userProfileId
        }

        return editTriviaGame(triviaGame.id, gameToSendToApi)
            .then(() => {
                navigate(`/TriviaGame/${triviaGameId}`)
            })
    }


    return (
        <>
            <Form>
                <img alt="" src="" width=""></img>
                <FormGroup>
                    <fieldset>
                        <div children="form-description">
                            <label htmlFor="name">Trivia Game Name:</label>
                            <input type="name"
                                className="form-control"
                                value={triviaGame.name}
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaGame }
                                        copy.name = evt.target.value
                                        setTriviaGame(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div children="form-description">
                            <label htmlFor="name">Image Url:</label>
                            <input type="name"
                                className="form-control"
                                value={triviaGame.imageUrl}
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaGame }
                                        copy.imageUrl = evt.target.value
                                        setTriviaGame(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div children="form-description">
                            <label htmlFor="name">User Profile Id:</label>
                            <input type="name"
                                className="form-control"
                                value={triviaGame.userProfileId}
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaGame }
                                        copy.userProfileId = evt.target.value
                                        setTriviaGame(copy)
                                    }
                                } />
                            <button onClick={handleCreateButtonClick}
                                className="saveButton">Save Game</button>
                        </div>
                    </fieldset>
                </FormGroup>
            </Form>
        </>
    )
}