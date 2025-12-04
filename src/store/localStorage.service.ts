// Envoltorio seguro para evitar errores (JSON inválido, claves faltantes, etc)
// Este servicio se puede usar en cualquier lugar de la aplicación para interactuar con localStorage de manera segura.

export const localStorageService = {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};
