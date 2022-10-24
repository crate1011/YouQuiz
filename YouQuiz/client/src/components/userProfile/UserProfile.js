import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";


const UserProfile = ({ userProfile }) => {

    const navigate = useNavigate()

    return (
        <Card>
            <p>PROFILE INFO</p>
            <CardBody>
                <p><b>Name: </b>{userProfile.name}</p>
                <p><b>Email: </b>{userProfile.email}</p>
                <button className="btn btn-warning" onClick={() => { navigate(`/UserProfile/${userProfile.id}`) }}>
                    DETAILS
                </button>
            </CardBody>
        </Card>
    );
};

export default UserProfile;