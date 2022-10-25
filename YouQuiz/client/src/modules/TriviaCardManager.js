const api = "/api/TriviaCard"

export const GetByTriviaGame = (triviaGameId) => {
    return fetch(api + `/GetByTriviaGame/${triviaGameId}`).then((res) => res.json());
};

export const deleteTriviaCard = (Id) => {
    return fetch(api + `/Delete/${Id}`, {
        method: "DELETE",
    });
};

export const addTriviaCard = (triviaCard) => {
    return fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(triviaCard),
    });
};