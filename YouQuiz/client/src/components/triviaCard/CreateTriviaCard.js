import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, FormGroup } from "reactstrap"
import { addTriviaCard } from "../../modules/TriviaCardManager"

export const CreateTriviaCard = () => {
    const { UserTriviaGameId } = useParams();
    const navigate = useNavigate()
    const [triviaCard, update] = useState({
        Question: "",
        WrongAnswerOne: "",
        WrongAnswerTwo: "",
        WrongAnswerThree: "",
        Answer: "",
        TriviaGameId: ""
    })

    const handleCreateButtonClick = (event) => {
        event.preventDefault()
        const cardToSendToApi = {
            Question: triviaCard.Question,
            WrongAnswerOne: triviaCard.WrongAnswerOne,
            WrongAnswerTwo: triviaCard.WrongAnswerTwo,
            WrongAnswerThree: triviaCard.WrongAnswerThree,
            Answer: triviaCard.Answer,
            TriviaGameId: UserTriviaGameId
        }
        addTriviaCard(cardToSendToApi).then(() => { navigate(`/UserTriviaGame/${UserTriviaGameId}`) })
    }

    return (
        <>
            <Form>
                <FormGroup>
                    <fieldset>
                        <div children="form-description">
                            <label htmlFor="name">Question:</label>
                            <input type="name"
                                className="form-control"
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaCard }
                                        copy.Question = evt.target.value
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
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaCard }
                                        copy.WrongAnswerOne = evt.target.value
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
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaCard }
                                        copy.WrongAnswerTwo = evt.target.value
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
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaCard }
                                        copy.WrongAnswerThree = evt.target.value
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
                                onChange={
                                    (evt) => {
                                        let copy = { ...triviaCard }
                                        copy.Answer = evt.target.value
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