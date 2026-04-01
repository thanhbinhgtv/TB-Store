import { useSyncExternalStore } from "react";

type AuthState = {
  isAuthenticated: boolean;
  userEmail: string | null;
};

let state: AuthState = {
  isAuthenticated: false,
  userEmail: null,
};

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function login(email: string) {
  state = {
    isAuthenticated: true,
    userEmail: email,
  };
  emitChange();
}

export function logout() {
  state = {
    isAuthenticated: false,
    userEmail: null,
  };
  emitChange();
}

export function useAuthStore() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => state,
    () => state,
  );
}
