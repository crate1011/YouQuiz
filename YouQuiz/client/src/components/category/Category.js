import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import "./category.css"

const Category = ({ cat }) => {
    const navigate = useNavigate()

    return (
        <Card>
            <CardBody id="cat-cardBody">
                <section className="catContainer">
                    <div className="catNameContainer">
                        <span className="catName">{cat.name}</span>
                    </div>
                    <button className="btn btn-warning" onClick={() => { navigate(`/GetByCategory/${cat.id}`) }}>
                        View Games
                    </button>
                </section>
            </CardBody>
        </Card>
    )
}

export default Category;