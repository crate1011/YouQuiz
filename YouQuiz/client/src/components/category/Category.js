import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import "./category.css"

const Category = ({ cat }) => {
    const navigate = useNavigate()

    return (
        <Card className="CatCard"
            style={{
                width: '18rem'
            }}
        >
            <CardBody>
                <CardTitle tag="h5" className="catTitle">
                    {cat.name}
                </CardTitle>

                <Button className="catButton" onClick={() => { navigate(`/GetByCategory/${cat.id}`) }}>
                    View Games
                </Button>
            </CardBody>
        </Card>
    )
}

export default Category;