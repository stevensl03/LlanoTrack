import { localStorageService } from "./localStorage.service";

const TOKEN_KEY = "auth_token";

export const tokenStorage = {
  save(token: string) {
    localStorageService.set(TOKEN_KEY, token);
  },

  get() {
    return localStorageService.get<string>(TOKEN_KEY);
  },

  remove() {
    localStorageService.remove(TOKEN_KEY);
  }
};
