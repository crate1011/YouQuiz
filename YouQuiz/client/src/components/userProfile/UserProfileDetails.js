import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { getUserProfileById } from "../../modules/UserProfileManager";

const UserProfileDetails = () => {
    const { userProfileId } = useParams();
    const [profileDetail, setProfileDetails] = useState({});
    const getProfileDetails = (id) => {
        getUserProfileById(id).then((userProfile) => {
            setProfileDetails(userProfile);
        });
    };

    useEffect(() => {
        getProfileDetails(userProfileId);
    }, []);

    return (
        <Card>
            <h2>User Profile Details</h2>
            <CardBody>
                <div className="container">
                    <div className="row justify-content-center">
                        <p>
                            <img src={profileDetail.imageUrl} />
                        </p>
                        <p>Name: {profileDetail.name}</p>
                        <p>Email: {profileDetail.email}</p>
                        <p>Date: {profileDetail.dateCreated}</p>
                        <p>Id: {profileDetail.id}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
export default UserProfileDetails;