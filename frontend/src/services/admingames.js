import api from "./api";

export const getGames = () => api.get("/admin/games");
export const createGame = (data) => api.post("/admin/games", data);
export const updateGame = (id, data) => api.put(`/admin/games/${id}`, data);
export const deleteGame = (id) => api.delete(`/admin/games/${id}`);
