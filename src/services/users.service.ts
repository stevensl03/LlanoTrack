import api from "./api";

export const getUserProfile = () => {
  return api.get("/users/me");
};

export const getUsers = () => {
  return api.get("/users");
};
