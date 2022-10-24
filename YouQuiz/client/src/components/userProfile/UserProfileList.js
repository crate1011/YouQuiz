import React, { useEffect, useInsertionEffect, useState } from "react";
import { getAllUserProfiles } from "../../modules/UserProfileManager";
import UserProfile from "./UserProfile";

const UserProfileList = () => {
    const [userProfiles, setUserProfiles] = useState([]);

    const getUsers = () => {
        getAllUserProfiles().then((userProfiles) => {
            setUserProfiles(userProfiles);

        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {userProfiles.map((userProfile) => (
                    <UserProfile userProfile={userProfile} key={userProfile.id} />
                ))}
            </div>
        </div>
    );
};
export default UserProfileList;