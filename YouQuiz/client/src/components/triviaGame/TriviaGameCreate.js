import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, FormGroup, Input, Label } from "reactstrap"
import { addTriviaGame } from "../../modules/triviaGameManager"
import { getAllCategories } from "../../modules/catManager"

export const TriviaGameCreate = () => {
    const navigate = useNavigate()
    const [cats, setCats] = useState([]);
    const [triviaGame, setTriviaGame] = useState({
        name: "",
        userProfileId: "",
        categoryId: 0
    })

    const getCatsFromApi = () => {
        getAllCategories().then(ts => setCats(ts));
    }
    useEffect(() => {
        getCatsFromApi();
    }, []);

    const handleCreateButtonClick = (event) => {
        event.preventDefault()
        const triviaGameToSendToApi = {
            name: triviaGame.name,
            userProfileId: triviaGame.userProfileId,
            categories: triviaGame.categoryId
        }
        addTriviaGame(triviaGameToSendToApi).then(() => { navigate(`/triviaGames`) })
    }

    return (
        <>
            <Form>
                <div>Create A Game</div>
                <img alt="" src="" width=""></img>
                <FormGroup>

                    <div children="form-description">
                        <label htmlFor="name">Trivia Game Name:</label>
                        <input type="name"
                            className="form-control"
                            onChange={
                                (evt) => {
                                    let copy = { ...triviaGame }
                                    copy.name = evt.target.value
                                    setTriviaGame(copy)
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
                                    copy.userProfileId = parseInt(evt.target.value)
                                    setTriviaGame(copy)
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
                                let copy = { ...triviaGame }
                                copy.categoryId = parseInt(evt.target.value)
                                setTriviaGame(copy)
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