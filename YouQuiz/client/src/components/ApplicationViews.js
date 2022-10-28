import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";
import React from "react";
import "../styles/Globals.css"
import AdminViews from "./AdminViews";
import UserViews from "./UserViews";

export const ApplicationViews = ({ isUser, isLoggedIn }) => {

    if (isUser) {
        return <AdminViews isUser={isUser} />
    }
    else {
        return <UserViews isUser={isUser} />
    }
}