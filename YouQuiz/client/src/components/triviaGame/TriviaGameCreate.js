import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Dropdown, Form, FormGroup, Input, Label } from "reactstrap"
import { addTriviaGame } from "../../modules/triviaGameManager"
import { getAllCategories } from "../../modules/catManager"




export const TriviaGameCreate = () => {
    const navigate = useNavigate()
    const [triviaGame, update] = useState({
        Name: "",
        UserProfileId: "",
        TriviaGameId: "",
        CategoryId: ""
    })

    const [cats, setCats] = useState([]);
    const getCatsFromApi = () => {
        getAllCategories().then(ts => setCats(ts));
    }
    getCatsFromApi()
    const handleCreateButtonClick = (event) => {
        event.preventDefault()
        const triviaGameToSendToApi = {
            Name: triviaGame.Name,
            UserProfileId: triviaGame.UserProfileId,
            TriviaGameId: triviaGame.Id,
            CategoryId: cats
        }
        addTriviaGame(triviaGameToSendToApi).then(() => { navigate("/tags") })
    }

    return (
        <>
            <Form>
                <img alt="" src="" width=""></img>
                <FormGroup>

                    <div children="form-description">
                        <label htmlFor="name">Trivia Game Name:</label>
                        <input type="name"
                            className="form-control"
                            onChange={
                                (evt) => {
                                    let copy = { ...triviaGame }
                                    copy.Name = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                    <div children="form-description">
                        <label htmlFor="userProfile">UserProfileId:</label>
                        <input type="name"
                            className="form-control"
                            onChange={
                                (evt) => {
                                    let copy = { ...triviaGame }
                                    copy.UserProfileId = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label for="categorySelect">Categories</Label>
                    <Input
                        id="categorySelect"
                        type="select"
                        onChange={
                            (evt) => {
                                let copy = { ...cats }
                                copy.id = evt.target.value
                                update(copy)
                            }
                        }>
                        <option>Choose A Category</option>
                        {
                            cats.map((cat) => (
                                <option value={cat.id} key={cat.id}>{cat.name}</option>
                            ))}
                    </Input>
                </FormGroup>
                <button onClick={handleCreateButtonClick}
                    className="saveButton">Save Game</button>

            </Form>
        </>
    )
}