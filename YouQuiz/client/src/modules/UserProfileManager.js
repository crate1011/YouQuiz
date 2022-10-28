import firebase from "firebase/app";
import { getToken } from "./authManager";
const baseUrl = "/api/UserProfile";


export const getAllUserProfiles = () => {
    return fetch(baseUrl).then((res) => res.json());
};
export const getUserProfileDetails = (firebaseUserId) => {
    return fetch(baseUrl + `/${firebaseUserId}`).then((res) => res.json());
};
export const getUserProfileById = (Id) => {
    return fetch(baseUrl + `/GetById/${Id}`).then((res) => res.json());
};
export const addUserProfile = (userProfile) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
    });
};

export const getCurrentUserByFirebaseId = () => {
    return getToken()?.then((token) => {
        const uid = firebase?.auth()?.currentUser.uid;
        return fetch(`${baseUrl}/${uid}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Error("An unknown error occured");
            }
        });
    });
};