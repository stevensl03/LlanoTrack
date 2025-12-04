import { localStorageService } from "./localStorage.service";

const SIDEBAR_KEY = "sidebar_open";

export const sidebarStorage = {
  get: (): boolean => {
    const stored = localStorageService.get(SIDEBAR_KEY);
    return stored ? JSON.parse(stored as string) : true;
  },
  
  save: (isOpen: boolean) => {
    localStorageService.set(SIDEBAR_KEY, isOpen);
  },
  
  remove: () => {
    localStorageService.remove(SIDEBAR_KEY);
  }
};