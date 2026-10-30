"use client";

import { useSyncExternalStore } from "react";

// Favoritos guardados en el navegador. Si localStorage no está disponible
// (modo privado, almacenamiento bloqueado) funcionan solo durante la visita.
const KEY = "altamira:favoritos";
const EMPTY: string[] = [];
let memory: string[] | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  if (memory) return memory;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    memory = Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    memory = [];
  }
  return memory;
}

function write(next: string[]) {
  memory = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Sin almacenamiento: se conserva en memoria.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      memory = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, read, () => EMPTY);
  const toggle = (code: string) => {
    const current = read();
    write(current.includes(code) ? current.filter((c) => c !== code) : [...current, code]);
  };
  return { favorites, toggle, isFavorite: (code: string) => favorites.includes(code) };
}
