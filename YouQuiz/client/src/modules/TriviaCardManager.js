const api = "/api/TriviaCard"

export const GetByTriviaGame = (triviaGameId) => {
    return fetch(api + `/GetByTriviaGame/${triviaGameId}`).then((res) => res.json());
};

export const deleteTriviaCard = (Id) => {
    return fetch(api + `/Delete/${Id}`, {
        method: "DELETE",
    });
};