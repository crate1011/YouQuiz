import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import "../styles/Globals.css"
import UserProfileList from "./userProfile/UserProfileList";
import UserProfileDetails from "./userProfile/UserProfileDetails";
import { CategoriesList } from "./category/CategoriesList";
import TriviaGameList from "./triviaGame/TriviaGameList";
import TriviaGameDetails from "./triviaGame/TriviaGameDetails";
import TriviaGameByCategory from "./triviaGame/TriviaGameByCategory";
import TriviaCardList from "./triviaCard/TriviaCardList";



export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="userProfile" element={<UserProfileList />} />
                    <Route path="categories" element={<CategoriesList />}></Route >
                    <Route path="triviaGames" element={<TriviaGameList />}></Route >
                    <Route path="userProfile/:userProfileId" element={<UserProfileDetails />} />
                    <Route path="triviaGame/:triviaGameId" element={<> <TriviaGameDetails /> <TriviaCardList /> </>} />
                    <Route path="GetByCategory/:GameId" element={<TriviaGameByCategory />} />


                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route >
            </Routes >
        </main >
    );
};