import React from "react";
import { Routes, Route } from "react-router-dom";
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
import { TriviaGameCreate } from "./triviaGame/TriviaGameCreate";
import { CreateTriviaCard } from "./triviaCard/CreateTriviaCard";
import { TriviaCardEdit } from "./triviaCard/TriviaCardEdit";
import { TriviaGameEdit } from "./triviaGame/TriviaGameEdit";
import { CategoryCreate } from "./category/CategoryCreate";
import UserTriviaGame from "./triviaGame/UserTriviaGames";
import UserTriviaGameDetails from "./triviaGame/UserTriviaGameDetails";
import UserTriviaCardList from "./triviaCard/UserTriviaCardList";

export default function AdminViews({ isLoggedIn, isUser }) {
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
                    <Route path="GetByCategory/:GameId" element={<TriviaGameByCategory />} />
                    <Route path="/TriviaGame/CreateTrivia" element={<TriviaGameCreate />} />
                    <Route path="/TriviaCard/CreateTriviaCard" element={<CreateTriviaCard />} />
                    <Route path="/TriviaCard/GetByTriviaGame/:triviaCardId" element={<TriviaCardEdit />} />
                    <Route path="/TriviaGame/Edit/:triviaGameId" element={<TriviaGameEdit />} />
                    <Route path="/TriviaGame/AddTriviaGameCategory/:triviaGameId" element={<CategoryCreate />} />
                    <Route path="/TriviaGame/GetByUserId" element={<UserTriviaGame />} isUser={isUser} />
                    <Route path="triviaGame/:triviaGameId" element={<> <TriviaGameDetails /> <TriviaCardList /> </>} />
                    <Route path="UserTriviaGame/:UserTriviaGameId" element={<> <UserTriviaGameDetails /> <UserTriviaCardList /> </>} />

                    <Route index element={<><TriviaGameCreate /> <CategoriesList /> </>} />

                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route >
            </Routes >
        </main >
    );
};
