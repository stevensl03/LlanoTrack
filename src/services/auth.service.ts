import api from "./api";

//logica de login
export const login = (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};

export const logout = () => {
  return api.post("/auth/logout");
};

export const register = (data: any) => {
  return api.post("/auth/register", data);
};

///logica de generar token de reset password
export const generateResetToken = (email: string) => {
  return api.post("/auth/reset-password/token", { email });
};

export const sendResetEmail = (email: string, token: string) => {
  return api.post("/auth/reset-password/email", { email, token });
};
