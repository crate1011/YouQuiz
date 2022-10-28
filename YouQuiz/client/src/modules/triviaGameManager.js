import { getToken } from "./authManager";

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

export const getByUserId = () => {
    return getToken()?.then((token) => {
        return fetch(`${api}/getByUserId`, {
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

export const editTriviaGame = (id, triviaGame) => {
    return fetch(api + `/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(triviaGame)
    })
}

export const addTriviaGameCategory = (triviaGameCategory) => {
    return fetch(api + `/AddTriviaGameCategory`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(triviaGameCategory),
    });
};