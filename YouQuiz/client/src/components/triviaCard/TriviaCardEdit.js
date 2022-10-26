import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, FormGroup } from "reactstrap"
import { editTriviaCard, getByCardId } from "../../modules/TriviaCardManager"

export const TriviaCardEdit = () => {
    const { triviaCardId } = useParams();
    const navigate = useNavigate()

    const [triviaCard, update] = useState({
        question: "",
        wrongAnswerOne: "",
        wrongAnswerTwo: "",
        wrongAnswerThree: "",
        answer: "",
        triviaGameId: 0
    })

    const getTriviaCards = () => {
        getByCardId(triviaCardId).then(t => update(t))
    }

    useEffect(
        () => {
            getTriviaCards()
        }, []
    )


    const handleCreateButtonClick = (event) => {
        event.preventDefault()

        const cardToSendToApi = {
            id: triviaCard.id,
            question: triviaCard.question,
            wrongAnswerOne: triviaCard.wrongAnswerOne,
            wrongAnswerTwo: triviaCard.wrongAnswerTwo,
            wrongAnswerThree: triviaCard.wrongAnswerThree,
            answer: triviaCard.answer,
            triviaGameId: parseInt(triviaCard.triviaGameId)
        }
        return editTriviaCard(triviaCard.id, cardToSendToApi)
            .then(() => {
                navigate(`/TriviaGame/${triviaCard.triviaGameId}`)
            })
    }


    return (
        <>
            <Form>
                <img alt="" src="" width=""></img>
                <FormGroup>
                    <fieldset>
                        <div children="form-description">
                            <label htmlFor="name">Trivia Game Id:</label>
                            <input type="name"
                                className="form-control"
                                value={triviaCard.triviaGameId}
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaCard }
                                        copy.triviaGameId = evt.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div children="form-description">
                            <label htmlFor="name">Question:</label>
                            <input type="name"
                                className="form-control"
                                value={triviaCard.question}
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaCard }
                                        copy.question = evt.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div children="form-description">
                            <label htmlFor="name">Wrong Answer:</label>
                            <input type="name"
                                className="form-control"
                                value={triviaCard.wrongAnswerOne}
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaCard }
                                        copy.wrongAnswerOne = evt.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div children="form-description">
                            <label htmlFor="name">Wrong Answer:</label>
                            <input type="name"
                                className="form-control"
                                value={triviaCard.wrongAnswerTwo}
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaCard }
                                        copy.wrongAnswerTwo = evt.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div children="form-description">
                            <label htmlFor="name">Wrong Answer:</label>
                            <input type="name"
                                className="form-control"
                                value={triviaCard.wrongAnswerThree}
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaCard }
                                        copy.wrongAnswerThree = evt.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div children="form-description">
                            <label htmlFor="name">Correct Answer:</label>
                            <input type="name"
                                className="form-control"
                                value={triviaCard.answer}
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaCard }
                                        copy.answer = evt.target.value
                                        update(copy)
                                    }
                                } />
                            <button onClick={handleCreateButtonClick}
                                className="saveButton">Save Card</button>
                        </div>
                    </fieldset>
                </FormGroup>
            </Form>
        </>
    )
}