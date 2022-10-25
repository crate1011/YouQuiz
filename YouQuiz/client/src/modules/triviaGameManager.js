const api = "/api/TriviaGame"

export const getAllTriviaGames = () => {
    return fetch(`${api}`).then(res => res.json())
}

export const getTriviaGameById = (Id) => {
    return fetch(api + `/${Id}`).then((res) => res.json());
};

export const getByCategoryId = (Id) => {
    return fetch(api + `/GetByCategory/${Id}`).then((res) => res.json());
};

export const deleteTriviaGame = (Id) => {
    return fetch(api + `/${Id}`, {
        method: "DELETE",
    });
};

export const addTriviaGame = (triviaGame) => {
    return fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(triviaGame),
    });
};