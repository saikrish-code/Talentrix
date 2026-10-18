import { useState, useCallback } from 'react';

type ToastVariant = 'default' | 'destructive' | 'success';

interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
}

// Minimal hook implementation — swap for a full state-machine version during feature work
let listeners: Array<(toasts: ToastItem[]) => void> = [];
let toasts: ToastItem[] = [];

function dispatch(toast: ToastItem) {
  toasts = [...toasts, toast];
  listeners.forEach((l) => l(toasts));
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== toast.id);
    listeners.forEach((l) => l(toasts));
  }, toast.duration ?? 5000);
}

export function useToast() {
  const [_toasts, setToasts] = useState<ToastItem[]>(toasts);

  const subscribe = useCallback((listener: (t: ToastItem[]) => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  // Subscribe to global toast list
  useState(() => {
    const unsubscribe = subscribe(setToasts);
    return unsubscribe;
  });

  const toast = useCallback((options: ToastOptions) => {
    dispatch({ ...options, id: Math.random().toString(36).slice(2) });
  }, []);

  return { toasts: _toasts, toast };
}
