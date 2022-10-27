import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Form, FormGroup, Input, Label } from "reactstrap";
import { getAllCategories } from "../../modules/catManager";
import { addTriviaGameCategory } from "../../modules/triviaGameManager"

export const CategoryCreate = () => {
    const { triviaGameId } = useParams();
    const [cats, setCats] = useState([]);
    const navigate = useNavigate()
    const [triviaGameCat, setTriviaGameCat] = useState({
        triviaGameId: 0,
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
        const ToSendToApi = {
            triviaGameId: triviaGameId,
            categoryId: triviaGameCat.categoryId
        }
        addTriviaGameCategory(ToSendToApi).then(() => { navigate(`/TriviaGame/${triviaGameId}`) })
    }

    return (
        <>
            <Form>
                <img alt="" src="" width=""></img>
                <FormGroup>
                    <Label for="categorySelect">Category Create</Label>
                    <Input
                        id="categorySelect"
                        type="select"
                        onChange={
                            (evt) => {
                                let copy = { ...triviaGameCat }
                                copy.categoryId = parseInt(evt.target.value)
                                setTriviaGameCat(copy)
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
                    className="saveButton">Save</button>
            </Form>
        </>
    )
}