import { localStorageService } from "./localStorage.service";

const USER_KEY = "user_data";

export const userStorage = {
  save(user: any) {
    localStorageService.set(USER_KEY, user);
  },

  get() {
    return localStorageService.get(USER_KEY);
  },

  remove() {
    localStorageService.remove(USER_KEY);
  }
};
