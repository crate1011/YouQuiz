import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetByTriviaGame } from "../../modules/TriviaCardManager";
import TriviaCard from "./TriviaCard";
import UserTriviaCard from "./UserTriviaCard";



const UserTriviaCardList = () => {
    const { UserTriviaGameId } = useParams();
    const [triviaCards, setTriviaCards] = useState([]);

    const getTriviaCards = () => {
        GetByTriviaGame(UserTriviaGameId).then((triviaCards) => {
            setTriviaCards(triviaCards);
        });
    };

    useEffect(() => {
        getTriviaCards();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">

                {triviaCards?.map((triviaCard) => (
                    <UserTriviaCard triviaCard={triviaCard} key={triviaCard.id} update={getTriviaCards} />
                ))}
            </div>
        </div>
    );
};
export default UserTriviaCardList;