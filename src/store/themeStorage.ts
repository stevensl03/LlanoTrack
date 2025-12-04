import { localStorageService } from "./localStorage.service";

const THEME_KEY = "app_theme";

export const themeStorage = {
    get: (): "light" | "dark" => {
        const stored = localStorageService.get(THEME_KEY);
        return (stored === "light" || stored === "dark") ? stored : "light";
    },

    save: (theme: "light" | "dark") => {
        localStorageService.set(THEME_KEY, theme);
    },

    remove: () => {
        localStorageService.remove(THEME_KEY);
    }
};