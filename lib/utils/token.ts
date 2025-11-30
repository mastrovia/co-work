const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const tokenStorage = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  },

  getUser(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(USER_KEY);
  },

  setUser(user: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USER_KEY, user);
  },

  removeUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(USER_KEY);
  },

  clearAll(): void {
    this.removeToken();
    this.removeUser();
  },
};
