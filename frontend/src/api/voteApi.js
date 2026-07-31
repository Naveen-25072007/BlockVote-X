import api from "./api";

export const castVote = (data) =>
    api.post("/vote", data);