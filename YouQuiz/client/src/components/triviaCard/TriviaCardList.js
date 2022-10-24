import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetByTriviaGame } from "../../modules/TriviaCardManager";
import TriviaCard from "./TriviaCard";



const TriviaCardList = () => {
    const { triviaGameId } = useParams();
    const [triviaCards, setTriviaCards] = useState([]);

    const getTriviaCards = (id) => {
        GetByTriviaGame(id).then((triviaCards) => {
            setTriviaCards(triviaCards);
        });
    };

    useEffect(() => {
        getTriviaCards(triviaGameId);
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">

                {triviaCards.map((triviaCard) => (
                    <TriviaCard triviaCard={triviaCard} key={triviaCard.id} update={getTriviaCards} />
                ))}
            </div>
        </div>

    );
};
export default TriviaCardList;