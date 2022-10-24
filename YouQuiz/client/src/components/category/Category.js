import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom"



const Category = ({ cat, update }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const navigate = useNavigate()

    return (
        <Card>
            <CardBody id="tag-cardBody">
                <section className="tagContainer">
                    <div className="tagNameContainer">
                        <span className="tagName">{cat.name}</span>
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